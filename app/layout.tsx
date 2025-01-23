import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

// local font import
import localFont from "next/font/local";

import "./globals.css";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
const ibmPlexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue", // for later use, specify variable to call
});

// title and description for SEO
export const metadata: Metadata = {
  title: "BookWiz",
  description:
    "BookWiz is a book borrowing univerisity library management solution",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          // using ibm using class name
          // using bebas via its variable name
          className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
