"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import HeaderButton from "../atoms/HeaderButton";
import {AiOutlineSearch} from 'react-icons/ai'

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="w-full sticky top-0 flex items-center justify-between p-4 z-[9999] backdrop-blur-sm">
      <Link href={"/"}>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">Consert</h1>
      </Link>
      <div className="flex gap-4 items-center text-sm  font-bold">
        <Link className="p-2 text-lg " href={"/artist"}>
          <div className="text-2xl hover:scale-110 duration-300 ease-in-out">
            <AiOutlineSearch />
          </div>
        </Link>
        {session ? (
          <HeaderButton name={"Logout"} onclick={signOut} />
        ) : (
          <HeaderButton name={"Login"} onclick={signIn} />
        )}
      </div>
    </header>
  );
}
