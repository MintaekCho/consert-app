"use client";
import Loading from "@/components/common/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  const { data: session }: any = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session && (session?.user.displayName === null || !session?.user.displayName)) {
      router.replace("/signup");
    } else {
      router.replace("/");
    }
  }, [session]);
  return <Loading />;
}
