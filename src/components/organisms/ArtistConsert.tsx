"use client";
import { ArtistData, ConcertData, RecentConsertData } from "@/types/_type";
import React, { useState } from "react";
import useSWR from "swr";
import Consert from "@/service/consert/Consert";
import ConcertCard from "../molecules/ConcertCard";
import Card from "../atoms/Card";
import GuideTxt from "../atoms/guideTxt";

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

  const proceedingConserts: ConcertData[] = data && data.data;

  return (
    <section className="w-full h-[600px] lg:h-[500px] overflow-auto flex flex-col px-4 py-8 pb-0 rounded-xl mb-4 lg:flex-row lg:gap-10 lg:p-0 ">
      <ul className="flex lg:flex-col items-center justify-center gap-4">
        {category.map((item, index) => (
          <li
            key={index}
            className={`cursor-pointer lg:text-sm 2xl:text-lg font-bold p-2  ${
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
      <div className="w-[85%] h-[90%] flex items-center justify-center">
        {consertType === "current" ? (
          proceedingConserts &&
          (proceedingConserts.length === 0 ? (
            <GuideTxt>현재 진행중인 공연이 없습니다.</GuideTxt>
          ) : (
            <ul className="w-full flex gap-10">
              {proceedingConserts.map((item: ConcertData, index) => (
                <li
                  className="w-full min-w-[250px] flex items-center"
                  key={item.title}
                >
                  <Card type="concert" data={item} />
                </li>
              ))}
            </ul>
          ))
        ) : (
          <ul className="w-full flex gap-10">
            {artist.recentConserts.map((item: RecentConsertData, index) => (
              <li className="w-full flex items-center" key={item.consertLink}>
                <a href={item.consertLink} target="_blank">
                  <ConcertCard consert={item} />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
