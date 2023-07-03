"use client";
import Artist from "@/service/artist/Artist";
import { ArtistData, BookmarkData } from "@/types/_type";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useSWR, { mutate } from "swr";

export default function BookmarkIcon({
  artist,
  modalVisible,
}: {
  artist: ArtistData;
  modalVisible: () => void;
}) {
  const { data: session } = useSession();
  const artistApi = new Artist();
  const [bookmarks, setBookmarks] = useState(artist?.bookmark);

  const handleClick = async () => {
    if (!session) {
      modalVisible();
    } else {
      const data = await artistApi.getBookmark(
        session?.user.id as string,
        artist._id
      );

      const fetcher = artistApi.getUserBookmark(session.user.id as string)

      if (data.data) {
        setBookmarks(
          bookmarks.filter((bookmark) => bookmark !== session.user.id)
        );
        await artistApi.deleteBookmark(session?.user.id as string, artist._id);
        mutate(`/api/artist/bookmark/${session?.user.id}`, '', {
          optimisticData: ({data}: {data: ArtistData[]} ) => (data.filter(cur => cur._id !== artist._id))
        })
      } else {
        setBookmarks([...bookmarks, session.user.id]);
        await artistApi.postBookmark(session?.user.id as string, artist._id);
        mutate(`/api/artist/bookmark/${session?.user.id}`, fetcher)
      }
    }
  };

  const isBookmark = bookmarks?.includes(session?.user.id as string);

  return (
    <>
      <div className="absolute top-4 right-[6%] p-2 z-10 text-white">
        {!isBookmark ? (
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
