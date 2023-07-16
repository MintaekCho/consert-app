"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Loading from "./Loading";

export default function LoginCheck() {
  const { data: session } = useSession();
  const router = useRouter();
  const handleLoginCheck = () => {
    if (
      session &&
      (session?.user.displayName === null || !session?.user.displayName)
    ) {
      console.log(4);
      router.replace("/signup");
    } else {
      console.log(5);
      router.replace("/");
    }
  };
  useEffect(() => {
    handleLoginCheck();
  }, [session]);
  return <Loading />;
}
