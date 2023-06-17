"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="w-full sticky top-0 flex items-center justify-between p-4">
      <Link href={"/"}>
        <h1 className="text-4xl font-bold">Consert</h1>
      </Link>
      <div className="flex gap-4 items-center text-sm  font-bold">
        <Link href={'/consert'}>consert</Link>
        {session ? (
          <button
            className="p-2 bg-purple-700 rounded-lg"
            onClick={signOut}
          >
            Logout
          </button>
        ) : (
          <button
            className="p-2 bg-purple-700 rounded-lg"
            onClick={signIn}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
