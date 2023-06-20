import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArtistData } from "./ArtistList";
import { AiOutlineHeart } from "react-icons/ai";

export default function ArtistCard({ artist }: { artist: ArtistData }) {
  return (
    <Link
      href={`/artist/${artist._id}`}
      className="group rounded-xl flex flex-col items-center overflow-hidden bg-white p-2 hover:scale-105 duration-300 ease-in-out"
    >
      <div
        className="relative w-300 h-300 bg-cover bg-center"
        style={{
          backgroundImage: `url(${artist.profile})`,
          width: "250px",
          height: "250px",
        }}
      >
        <div className="absolute top-0 right-0 p-2">
          <AiOutlineHeart className="text-2xl hover:text-red-400 duration-300 ease-in-out" />
        </div>
      </div>
      <p className="text-lg font-bold text-center text-black mt-2 group-hover:tracking-widest group-hover:text-red-400 duration-300 ease-in-out">
        {artist.korName ? artist.korName : artist.enName}
      </p>
    </Link>
  );
}
