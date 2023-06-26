"use client";
import { ProceedingConsertData, RecentConsertData } from "@/types/_type";
import React, { useState } from "react";
import { ArtistData } from "./ArtistList";
import useSWR from "swr";
import Consert from "@/service/consert/Consert";
import ConsertCard from "../molecules/ConsertCard";

type ConsertStateType = "current" | "recent";
type Props = {
  artist: ArtistData;
};

export default function ArtistConsert({ artist }: Props) {
  const [consertType, setConsertType] = useState<ConsertStateType>("current");
  const category: { name: string; state: ConsertStateType }[] = [
    { name: "공연 중", state: "current" },
    { name: "최근 공연", state: "recent" },
  ];

  const consertApi = new Consert();

  const { data, isLoading, error } = useSWR(
    `/api/consert/proceeding/${artist.korName}`,
    () => consertApi.procConsert(artist.korName)
  );

  const proceedingConserts: ProceedingConsertData[] = data && data.data;
  console.log(proceedingConserts);

  return (
    <section className="w-full h-[500px] overflow-auto flex gap-10 px-4 py-8 rounded-xl bg-gray-950">
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
      <div className="w-[90%] flex items-center">
        {consertType === "current" ? (
          proceedingConserts &&
          (proceedingConserts.length === 0 ? (
            <p className="w-full text-2xl font-bold text-center ml-10">
              🥹현재 진행중인 공연이 없습니다.
            </p>
          ) : (
            <ul className="flex gap-10">
              {proceedingConserts.map((item: ProceedingConsertData, index) => (
                <li className="w-full min-w-[250px] flex items-center" key={item.title}>
                  <ConsertCard consert={item} />
                </li>
              ))}
            </ul>
          ))
        ) : (
          <ul className="w-full flex gap-10">
            {artist.recentConserts.map((item: RecentConsertData, index) => (
              <li className="w-full flex items-center" key={item.consertLink}>
                <ConsertCard consert={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}