"use client";
import { useConsertApi } from "@/context/ConsertApiContext";
import { ConcertData } from "@/types/_type";
import React, { useEffect } from "react";
import useSWR, { mutate } from "swr";
import Card from "../atoms/Card";
import Title from "../atoms/Title";
import Loading from "../common/Loading";
import CarouselView from "./CarouselView";
import { FaTrophy } from "react-icons/fa";

export default function HotRank() {
  const consert = useConsertApi();

  const { data, error, isLoading } = useSWR(`rank`, () => consert.rank());
  
  useEffect(() => {
    mutate("rank");
  }, []);

  const ranks: ConcertData[] = data && data.data;

  return (
    <section className="flex flex-col mt-20">
      <Title icon={<FaTrophy />}>TOP 10</Title>
      {isLoading && <Loading />}
      {ranks && (
        <CarouselView type={"auto"}>
          {ranks.map((rank) => (
            <Card key={rank._id} type={"concert"} data={rank} />
          ))}
        </CarouselView>
      )}
    </section>
  );
}
