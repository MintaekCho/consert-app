"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Loading from "./Loading";

export default function LoginCheck() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (
      session &&
      (session?.user.displayName === null || !session?.user.displayName)
    ) {
      router.replace("/signup");
    } else {
      router.replace("/");
    }
  }, [session, router]);
  return <Loading />;
}
