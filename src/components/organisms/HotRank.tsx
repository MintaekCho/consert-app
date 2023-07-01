"use client";
import { useConsertApi } from "@/context/ConsertApiContext";
import { Rank } from "@/types/_type";
import React from "react";
import useSWR from "swr";
import Loading from "../common/Loading";
import ConsertCard from "../molecules/ConsertCard";
import CarouselView from "./CarouselView";

export default function HotRank() {
  const consert = useConsertApi();

  const { data, error, isLoading } = useSWR("rank", () => consert.rank());

  const ranks: Rank[] = data && data.data;


  return (
    <section className="flex flex-col mt-8">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-8">🏆 TOP 10</h2>
      {isLoading && <Loading />}
      {ranks && (
        <CarouselView type={"auto"}>
          {ranks.map((rank) => (
            <ConsertCard key={rank._id} consert={rank} />
          ))}
        </CarouselView>
      )}
    </section>
  );
}
