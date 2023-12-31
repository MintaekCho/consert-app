import { ConcertData, Rank, RecentConsertData } from "@/types/_type";
import Image from "next/image";
import React from "react";

export default function ConcertCard({
  consert,
}: {
  consert: Rank | ConcertData | RecentConsertData;
}) {
  return (
    <article className="w-full max-w-[250px] flex flex-col gap-2 justify-center text-center hover:scale-105 duration-300 ease-in-out">
        <Image
          // className="min-w-[230px] max-h-[280px]"
          src={consert.image}
          alt={consert.title}
          width={250}
          height={350}
          style={{ height: 350 }}
        />
        <p className="w-full text-md md:text-lg lg:text-xl xl:text-2xl font-bold truncate">
          {consert.title}
        </p>
        <p className="w-full text-xs md:text-sm xl:text-md font-bold opacity-70 truncate">
          {consert.place}
        </p>
    </article>
  );
}
