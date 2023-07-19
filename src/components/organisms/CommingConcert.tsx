import { ConcertData } from "@/types/_type";
import React from "react";
import Card from "../atoms/Card";
import Title from "../atoms/Title";
import CarouselView from "./CarouselView";
import { BsFillBellFill } from "react-icons/bs";

export default function CommingConcert({data}: {data: ConcertData[]}) {

  return (
    <section className="flex flex-col mt-20">
      <Title icon={<BsFillBellFill />}>Comming</Title>
      {/* {isLoading && <Loading />} */}
      {data && (
        <CarouselView type={"auto"}>
          {data.map((item) => (
            <Card key={item._id} type={"concert"} data={item} />
          ))}
        </CarouselView>
      )}
    </section>
  );
}
