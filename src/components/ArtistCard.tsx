import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArtistData } from "./ArtistWrap";

export default function ArtistCard({ artist }: { artist: ArtistData }) {
  return (
    <Link
      href={`/artist/${artist._id}`}
      className="group rounded-xl flex flex-col items-center overflow-hidden bg-[#f2f2f2] p-2 hover:scale-105 duration-300 ease-in-out"
    >
      <Image
        className="max-h-[300px]"
        src={artist.profile}
        alt={artist.korName}
        width={300}
        height={500}
      />
      <p className="text-lg font-bold text-center text-black mt-2 group-hover:tracking-widest group-hover:text-red-400 duration-300 ease-in-out">
        {artist.korName ? artist.korName : artist.enName}
      </p>
    </Link>
  );
}
