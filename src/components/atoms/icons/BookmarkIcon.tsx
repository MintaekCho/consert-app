"use client";
import Artist from "@/service/artist/Artist";
import { ArtistData } from "@/types/_type";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function BookmarkIcon({ artist }: { artist: ArtistData }) {
  const { data: session } = useSession();
  const [modalVisible, setModalVisible] = useState(false);


  const handleClick = async () => {
    const artistApi = new Artist();
    console.log(session?.user.id, artist._id);
    const data = await artistApi.getBookmark(
      session?.user.id as string,
      artist._id
    );
    console.log(data)
    if (data.data) {
      console.log("delete");
      await artistApi.deleteBookmark(session?.user.id as string, artist._id);
    } else {
      console.log("post");
      await artistApi.postBookmark(session?.user.id as string, artist);
    }
    if (!session) {
      // 로그인 에러 모달
      // setModalVisible(!modalVisible);
    }
    // session && artistApi.postBookmark();
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
