"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Loading from "./Loading";

export default function LoginCheck() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "loading") {
      return;
    } else if (
      status === "authenticated" &&
      (session?.user.displayName === null || !session?.user.displayName)
    ) {
      router.replace("/signup");
    } else {
      router.replace("/");
    }
  }, [status, session, router]);
  return <Loading />;
}
