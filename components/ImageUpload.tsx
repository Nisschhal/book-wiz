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
const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

// calling the backend api/auth/imagekit
const authenticator = async () => {
  try {
    // from the api route
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
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

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (file: string) => void;
}) => {
  // for button click to trigger imagekit uploader
  const ikUploadRef = useRef(null);
  // for path name to store
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  // when error while submitting imageuploader
  const onError = (error: any) => {
    console.log("Error while uploading image", error);
    toast({
      title: "Image upload failed!",
      description: `Your image could not be uploaded. Pleast try again!`,
    });
  };

  // when success set filepath to state and form onFileChange callback
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: "Image uploaded successfully!",
      description: `${res.filePath} uploaded successfully!`,
    });
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
        fileName="text-upload.png"
      />

      {/* custom image uploader button to activate IKUpload using ref when clicked */}
      <button
        className="upload-btn"
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
        <p className="text-base text-light-100">Upload a File</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {/* uploaded file */}
      {/* // image element wrapper with next/image in it  */}
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
