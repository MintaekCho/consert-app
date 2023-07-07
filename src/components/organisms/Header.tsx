"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import HeaderButton from "../atoms/HeaderButton";
import Gnb from "../molecules/Gnb";
import Image from "next/image";
import logo from "@/app/logo_text.png";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="w-full sticky top-0 flex items-center justify-between p-4 z-[9999] backdrop-blur-sm">
      <Link href={"/"} className="">
        <Image className="min-w-[80px] min-h-[60px] hover:scale-105 duration-300" src={logo} alt="consert connect" width={100} />
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold hidden">
          CONCON
        </h1>
      </Link>
      <div className="flex gap-4 items-center text-sm  font-bold">
        <Gnb />
        {session ? (
          <HeaderButton name={"Logout"} onclick={signOut} />
        ) : (
          <HeaderButton name={"Login"} onclick={signIn} />
        )}
      </div>
    </header>
  );
}
