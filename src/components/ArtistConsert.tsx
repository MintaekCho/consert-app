"use client";
import { RecentConsertData } from "@/types/_type";
import React, { useState } from "react";
import { ArtistData } from "./ArtistList";
import ConsertCard from "./ConsertCard";

type ConsertStateType = "current" | "recent";
type Props = {
  artist: ArtistData;
};

export default function ArtistConsert({ artist }: Props) {
  const [consertType, setConsertType] = useState<ConsertStateType>("current");
  const category: {name: string, state: ConsertStateType}[] = [
    { name: "공연 중", state: "current" },
    { name: "최근 공연", state: "recent" },
  ];

  return (
    <section className="w-full h-[400px] overflow-auto flex gap-10 px-4 py-8 rounded-xl bg-gray-950">
      <ul className="flex flex-col items-center justify-center gap-4">
        {category.map((item, index) => (
          <li
            key={index}
            className={`cursor-pointer text-lg font-bold p-2  ${
              consertType === item.state
                ? "bg-purple-600 rounded-lg"
                : "hover:text-[#c4c4c4]"
            }`}
            onClick={() => setConsertType(item.state)}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div className="flex items-center">
        {consertType === "current" ? (
          <p className="w-full text-2xl font-bold text-center ml-10">
            🥹현재 진행중인 공연이 없습니다.
          </p>
        ) : (
          <ul className="flex gap-10">
            {artist.recentConserts.map((item: RecentConsertData, index) => (
              <li key={item.title}>
                <ConsertCard consert={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
