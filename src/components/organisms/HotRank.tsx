"use client";
import { useConsertApi } from "@/context/ConsertApiContext";
import { ConcertData } from "@/types/_type";
import React from "react";
import useSWR from "swr";
import Card from "../atoms/Card";
import Title from "../atoms/Title";
import Loading from "../common/Loading";
import CarouselView from "./CarouselView";
import {FaTrophy} from 'react-icons/fa'
import { getStringSelectDate } from "@/utils/date";

export default function HotRank() {
  const consert = useConsertApi();
  const todayDate = getStringSelectDate(new Date())
  console.log(todayDate)

  const { data, error, isLoading } = useSWR(`rank/${todayDate}`, () => consert.rank());

  const ranks: ConcertData[] = data && data.data;

  return (
    <section className="flex flex-col mt-20">
      <Title icon={<FaTrophy />}>
        TOP 10
      </Title>
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
