"use client";
import { getApi } from "@/service/api/api";
import { ConcertData } from "@/types/_type";
import React from "react";
import useSWR from "swr";
import Card from "../atoms/Card";
import Title from "../atoms/Title";
import Loading from "../common/Loading";
import CarouselView from "./CarouselView";
import { BsFillBellFill } from "react-icons/bs";
import { getStringSelectDate } from "@/utils/date";

export default function CommingConcert() {
  const todayDate = getStringSelectDate(new Date());
  const curHour = new Date().getHours().toString();
  const { data, error, isLoading } = useSWR(
    `/api/consert/come/${todayDate}-${curHour}`,
    () => getApi("/consert/come")
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

export async function getStaticProps() {
  const commings = await getApi("/api/consert/come");
  return {
    props: {
      initialData: commings.result,
      revalidate: 1000,
    },
  };
}
