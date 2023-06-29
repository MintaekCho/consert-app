"use client";
import { ArtistData } from "@/types/_type";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import BookmarkIcon from "../atoms/icons/BookmarkIcon";
import Modal from "../common/Modal";

export default function ArtistCard({ artist }: { artist: ArtistData }) {
  const [modalVisible, setModalVisible] = useState(false);
  const handleVisible = () => setModalVisible(!modalVisible);

  return (
    <>
      {modalVisible && (
        <Modal
          description="로그인이 후 이용 가능합니다."
          buttonText="로그인"
          onClick={signIn}
          setVisible={handleVisible}
        />
      )}
      <article className="max-w-[300px] relative group rounded-xl flex flex-col items-center overflow-hidden bg-white p-2 m-2 hover:scale-105 duration-300 ease-in-out">
        <Link href={`/artist/${artist._id}`}>
          <div
            className="relative w-300 h-300 bg-cover bg-center"
            style={{
              backgroundImage: `url(${artist.profile})`,
              width: "250px",
              height: "250px",
            }}
          ></div>
          <p className="text-lg font-bold text-center text-black mt-2 group-hover:tracking-widest group-hover:text-red-400 duration-300 ease-in-out">
            {artist.korName ? artist.korName : artist.enName}
          </p>
        </Link>
        <BookmarkIcon artist={artist} modalVisible={handleVisible}/>
      </article>
    </>
  );
}
