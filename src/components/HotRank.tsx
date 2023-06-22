"use client";
import { useConsertApi } from "@/context/ConsertApiContext";
import { Rank } from "@/types/_type";
import React from "react";
import useSWR from "swr";
import ConsertCard from "./ConsertCard";
import CarouselView from "./ui/CarouselView";



export default function HotRank() {
  const consert = useConsertApi();

  const { data, error, isLoading } = useSWR("rank", () => consert.rank());

  const ranks: Rank[] = data && data.data;

  console.log(ranks);

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold">TOP 10</h2>
      {ranks && (
        <CarouselView type={'auto'}>
          {ranks.map((rank) => (
            <ConsertCard key={rank._id} consert={rank} />
          ))}
        </CarouselView>
      )}
    </section>
  );
}
