"use client";
import { ConcertData } from "@/types/_type";
import React, { useState } from "react";
import useSWR from "swr";
import Card from "../atoms/Card";
import Title from "../atoms/Title";
import Loading from "../common/Loading";
import CarouselView from "./CarouselView";
import { FaTrophy } from "react-icons/fa";
import { getApi } from "@/service/api/api";

export default function HotRank() {
  const [timeStamp, setTimeStamp] = useState(new Date().getTime().toString());

  const { data, error, isLoading } = useSWR(
    `/api/consert/rank?timeStamp=${timeStamp}`,
    () => getApi(`consert/rank?timeStamp=${timeStamp}`)
  );

  const ranks: ConcertData[] = data && data.result;

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
