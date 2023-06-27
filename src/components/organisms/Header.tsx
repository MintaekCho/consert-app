"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import HeaderButton from "../atoms/HeaderButton";

export default function Header() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <header className="w-full sticky top-0 flex items-center justify-between p-4 z-10">
      <Link href={"/"}>
        <h1 className="text-5xl font-bold">Consert</h1>
      </Link>
      <div className="flex gap-4 items-center text-sm  font-bold">
        <Link className="p-2 text-lg " href={"/artist"}>artist</Link>
        {session ? (
          <HeaderButton name={"Logout"} onclick={signOut} />
        ) : (
          <HeaderButton name={"Login"} onclick={signIn} />
        )}
      </div>
    </header>
  );
}
