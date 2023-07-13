"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Loading from "../common/Loading";

type Props = {
  w: number;
  h: number;
  textSize: string;
};
export default function Profile({ w, h, textSize }: Props) {
  const { data: session } = useSession();
  return (
   session ? <Link href={"/mypage"} className="flex flex-col gap-1 items-center mr-2">
      <Image
        className="rounded-full"
        src={session?.user.image as string}
        alt={session?.user.name as string}
        width={w}
        height={h}
      />
      <p className={`text-${textSize} font-bold text-yellow-400`}>{session?.user.displayName}</p>
    </Link>
    :
    <Loading />
  );
}
