import { ArtistData } from "@/types/_type";
import Link from "next/link";
import React from "react";
import BookmarkIcon from "../atoms/icons/BookmarkIcon";

export default function ArtistCard({ artist }: { artist: ArtistData }) {

  return (
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
      <BookmarkIcon artist={artist} />
    </article>
  );
}
