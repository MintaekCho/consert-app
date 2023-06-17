import Image from "next/image";
import React from "react";
import { YoutubeData } from "./YoutubeView";

export default function YoutubeCard({ video }: { video: YoutubeData }) {
  const { title, thumbnails, channelTitle } = video.snippet;

  return (
    <article className="rounded-md overflow-hidden shadow-md hover:shadow-lg">
      <Image
        className="w-full"
        src={thumbnails.default.url}
        alt={title}
        width={80}
        height={40}
      />
      <div className="flex flex-col gap-1 items-center p-4">
        <h3 className="text-lg font-bold truncate">{title}</h3>
        <p className="w-full truncate text-center">{channelTitle}</p>
      </div>
    </article>
  );
}
