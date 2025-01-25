"use client";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <div className="my-10 flex justify-between gap-5">
      <Link href={"/"}>
        <Image src={"/icons/logo.svg"} alt="logo" width={40} height={40} />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link href={"/my-profile"}>
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback>
                {getInitials(session.user?.name!)}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
        <li className="text-white">
          <Button onClick={() => signIn()}>Logout</Button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
