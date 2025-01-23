import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

// pass the imagekit authenticator as json in GET => http://localhost:3000/api/auth/imagekit

export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
