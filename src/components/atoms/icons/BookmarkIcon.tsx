"use client";
import Artist from "@/service/artist/Artist";
import { ArtistData, BookmarkData } from "@/types/_type";
import { useSession } from "next-auth/react";
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useSWR from "swr";

export default function BookmarkIcon({
  artist,
  modalVisible,
}: {
  artist: ArtistData;
  modalVisible: () => void;
}) {
  const { data: session } = useSession();
  const artistApi = new Artist();

  const { data: userBookmark, mutate } = useSWR(
    `/api/artist/bookmark/${session?.user.id}`,
    () => artistApi.getUserBookmark(session?.user.id as string)
  );

  const handleClick = async () => {
    if (!session) {
      modalVisible();
    } else {
      const data = await artistApi.getBookmark(
        session?.user.id as string,
        artist._id
      );
      if (data.data) {
        await artistApi.deleteBookmark(session?.user.id as string, artist._id);
        mutate();
        mutate();
      } else {
        await artistApi.postBookmark(session?.user.id as string, artist);
        mutate();
        mutate();
      }
    }
  };

  return (
    <>
      <div className="absolute top-4 right-[6%] p-2 z-10 text-white">
        {userBookmark?.data.filter(
          (b: BookmarkData) => b?.artist._id === artist._id
        ).length === 0 ? (
          <AiOutlineHeart
            onClick={handleClick}
            className="text-3xl hover:text-red-400 duration-300 ease-in-out"
          />
        ) : (
          <AiFillHeart
            onClick={handleClick}
            className="text-3xl text-red-400 hover:text-red-300 duration-300 ease-in-out"
          />
        )}
      </div>
    </>
  );
}
