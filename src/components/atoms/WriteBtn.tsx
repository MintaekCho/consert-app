'use client'
import { loadingState } from "@/atom";
import { useRouter } from "next/navigation";
import React from "react";
import { useRecoilValue } from "recoil";

type Props = {
    text: string;
    style?: string;
    routeUrl?: string;
    onClick?: () => void;
}
export default function WriteBtn({text, style, routeUrl, onClick}: Props) {
  const isLoading = useRecoilValue(loadingState)
  const route = useRouter();
  const path = routeUrl ? routeUrl : '/'
  const handleRoute = () => {
    route.push(path);
  };
  return <button disabled={isLoading} className={style ? style :`bg-purple-600 px-6 py-2 rounded-full font-bold hover:opacity-90`} onClick={onClick ? onClick : handleRoute}>{text}</button>;
}
