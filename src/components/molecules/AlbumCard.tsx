import { AlbumData } from "@/types/_type";
import Image from "next/image";
import React from "react";

export default function AlbumCard({ album }: { album: AlbumData }) {
  const {
    albumImage,
    title,
    titleSong,
    vdoName,
    releaseDate,
    songCount,
    likeCount,
  } = album;

  return (
    <a
      href={`https://www.melon.com/search/total/index.htm?q=${title}&section=&searchGnbYn=Y&kkoSpl=Y&kkoDpType=&mwkLogType=T`}
      target="_blank"
      className="w-full max-w-[250px] flex flex-col items-center justify-center p-2  hover:scale-105 duration-300 ease-in-out cursor-pointer"
    >
      <Image
        className="min-w-[250px] min-h-[280px]"
        src={albumImage}
        alt={title}
        width={250}
        height={280}
      />
      <div className="w-full flex flex-col items-center justify-center">
        <p className="w-full truncate text-lg font-bold mt-2 text-white">{title}</p>
        <p className="w-full truncate text-sm opacity-80 text-white">
          <span className="text-gray-400">Title : </span>
          {titleSong}
        </p>
      </div>
    </a>
  );
}
