import { ConcertData } from "@/types/_type";
import React from "react";
import Card from "../atoms/Card";
import Title from "../atoms/Title";
import CarouselView from "./CarouselView";
import { FaTrophy } from "react-icons/fa";

export default function HotRank({data}: {data: ConcertData[]}) {

  return (
    <section className="flex flex-col mt-20">
      <Title icon={<FaTrophy />}>TOP 10</Title>
      {/* {isLoading && <Loading />} */}
      {data && (
        <CarouselView type={"auto"}>
          {data.map((rank) => (
            <Card key={rank._id} type={"concert"} data={rank} />
          ))}
        </CarouselView>
      )}
    </section>
  );
}

