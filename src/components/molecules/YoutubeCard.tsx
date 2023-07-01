"use client";
import { YoutubeData } from "@/types/_type";
import Image from "next/image";
import React, { useState } from "react";

export default function YoutubeCard({ video }: { video: YoutubeData }) {
  const { title, thumbnails, channelTitle } = video.snippet;
  const [visible, setVisible] = useState(false);

  return (
    <article className="w-full h-full flex flex-col items-center justify-center rounded-md overflow-hidden shadow-md hover:shadow-lg">
      {visible ? (
        <iframe
          width="90%"
          height="200px"
          src={`https://www.youtube.com/embed/${video.id}`}
          title={title}
          frameBorder="0"
        ></iframe>
      ) : (
        <Image
          onClick={() => setVisible(true)}
          className="w-4/5 h-[270px] cursor-pointer"
          src={thumbnails.high.url}
          alt={title}
          width={200}
          height={200}
        />
      )}

      <div className="w-full flex flex-col gap-1 items-center p-4">
        <h3 className="w-full text-lg font-bold truncate text-center">
          {title}
        </h3>
        <p className="w-full truncate text-center">{channelTitle}</p>
      </div>
    </article>
  );
}
