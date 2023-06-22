import { ConsertData, Rank, RecentConsertData } from "@/types/_type";
import Image from "next/image";
import React from "react";

export default function ConsertCard({
  consert,
}: {
  consert: Rank | ConsertData | RecentConsertData;
}) {
  return (
    <article className="w-full max-w-[250px] flex flex-col gap-2 items-center hover:scale-105 duration-300 ease-in-out">
        <Image
        className="min-w-[230px] max-h-[280px]"
          src={consert.image}
          alt={consert.title}
          width={250}
          height={450}
        />
      <p className="w-full text-2xl font-bold text-center truncate">{consert.title}</p>
      <p className="font-bold opacity-90">{consert.place}</p>
    </article>
  );
}
