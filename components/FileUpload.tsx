"use client";
import {
  IKImage,
  IKVideo,
  ImageKitProvider,
  IKUpload,
  ImageKitContext,
} from "imagekitio-next";
import config from "@/lib/config";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const DOMAIN =
  process.env.NODE_ENV !== "production"
    ? config.env.apiEndpoint
    : config.env.prodApiEndpoint;

// calling the backend api/auth/imagekit
const authenticator = async () => {
  try {
    // from the api route
    const response = await fetch(`${DOMAIN}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status: ${response.status}: ${errorText}`,
      );
    }
    const data = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(
      `Authentication requirest failed, imagekit: ${error.message}`,
    );
  }
};

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (file: string) => void;
  value?: string;
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  // for button click to trigger imagekit uploader
  const ikUploadRef = useRef(null);
  // for path name to store
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });

  // progress sate
  const [progress, setProgres] = useState(0);

  const styles = {
    button: variant === "dark" ? "bg-dark-300" : "bg-light-600",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  // when error while submitting imageuploader
  const onError = (error: any) => {
    console.log("Error while uploading image", error);
    toast({
      title: `${type} upload failed!`,
      description: `Your ${type} could not be uploaded. Pleast try again!`,
    });
  };

  // when success set filepath to state and form onFileChange callback
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: `${type} uploaded successfully!`,
      description: `${res.filePath} uploaded successfully!`,
    });
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File size too large!",
          description: "Please upload a file that is less than 20MB in size",
          variant: "destructive",
        });
        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File size too large!",
          description: "Please upload a file that is less than 50MB in size",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  return (
    // Image Upload Provider : Wrapper
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      {/* Image uploader but hidden with passed ref to click later*/}
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onSuccess={onSuccess}
        onError={onError}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgres(0)}
        onUploadProgress={({ loaded, total }) => {
          const precent = Math.round((loaded / total) * 100);
          setProgres(precent);
        }}
        folder={folder}
        accept={accept}
      />

      {/* custom image uploader button to activate IKUpload using ref when clicked */}
      <button
        className={cn("upload-btn", styles.button)}
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current.click();
          }
        }}
      >
        <Image
          src={"/icons/upload.svg"}
          alt="upload-icon"
          height={20}
          width={20}
          className="object-contain"
        />
        <p className={cn("text-base text-light-100", styles.placeholder)}>
          {placeholder}
        </p>
        {file && (
          <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
        )}
      </button>
      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div
            className="progress"
            style={{
              width: `${progress}`,
            }}
          >
            {progress} %
          </div>
        </div>
      )}
      {/* uploaded file */}
      {/* // image element wrapper with next/image in it  */}
      {file &&
        (type === "image" ? (
          <IKImage
            alt={file.filePath || "Upload Image"}
            path={file.filePath}
            width={500}
            height={300}
          />
        ) : (
          <IKVideo
            path={file.filePath}
            controls={true}
            className="h-96 w-full rounded-xl"
          />
        ))}
    </ImageKitProvider>
  );
};

export default FileUpload;
