"use client";
import { getApi } from "@/service/api/api";
import { ConcertData } from "@/types/_type";
import React, { useState } from "react";
import useSWR from "swr";
import Card from "../atoms/Card";
import Title from "../atoms/Title";
import Loading from "../common/Loading";
import CarouselView from "./CarouselView";
import { BsFillBellFill } from "react-icons/bs";

export default function CommingConcert() {
  const [timeStamp, setTimeStamp] = useState(new Date().getTime().toString())
  const { data, error, isLoading } = useSWR(`/api/consert/come?timeStamp=${timeStamp}`, () =>
    getApi(`/consert/come?timeStamp=${timeStamp}`)
  );

  const commingConcerts: ConcertData[] = data && data.result;
  return (
    <section className="flex flex-col mt-20">
      <Title icon={<BsFillBellFill />}>Comming</Title>
      {isLoading && <Loading />}
      {commingConcerts && (
        <CarouselView type={"auto"}>
          {commingConcerts.map((item) => (
            <Card key={item._id} type={"concert"} data={item} />
          ))}
        </CarouselView>
      )}
    </section>
  );
}
