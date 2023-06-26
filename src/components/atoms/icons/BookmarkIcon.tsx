"use client";
import UserService from "@/service/user/User";
import { ArtistData } from "@/types/_type";
import { useSession } from "next-auth/react";
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function BookmarkIcon({ artist }: { artist: ArtistData }) {
  const { data: session } = useSession();
  const handleClick = () => {
    const userApi = new UserService();
    session && userApi.patchBookmark(session?.user.email, artist);
  };

  return (
    <div className="absolute top-4 right-[6%] p-2 z-10 text-white">
      <AiOutlineHeart
        onClick={handleClick}
        className="text-3xl hover:text-red-400 duration-300 ease-in-out"
      />
    </div>
  );
}