"use client";
import { getStringSelectDate } from "@/utils/date";
import React, { useState } from "react";
import Calendar from "../common/Calendar";
import useSWR from "swr";
import { getApi } from "@/service/api/api";
import Card from "../atoms/Card";
import { ConcertData } from "@/types/_type";
import Title from "../atoms/Title";
import Loading from "../common/Loading";

export default function ConcertSchedule() {
  const [selectDate, setSelectDate] = useState(new Date());
  const handleSelectDate = (date: Date, day: number) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    setSelectDate(new Date(year, month, day));
  };
  const { data, isLoading, error } = useSWR(
    `/api/consert/select?date=${getStringSelectDate(selectDate)}`,
    () => {
      return getApi("/consert/select", {
        params: {
          date: getStringSelectDate(selectDate),
        },
      });
    }
  );
  const concerts: ConcertData[] = data?.result;

  return (
    <div>
      <Calendar selectDate={selectDate} setSeleteDate={handleSelectDate} />
      <Title>{`${selectDate.getFullYear()}년 ${
        selectDate.getMonth() + 1
      }월 ${selectDate.getDate()}일 - 콘서트 일정`}</Title>
      {isLoading ? (
        <Loading />
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {concerts?.map((item) => (
            <li key={item._id}>
              <Card type={"concert"} data={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
