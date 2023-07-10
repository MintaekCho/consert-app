"use client";
import { getDaysInMonth, getFirstDayOfMonth, getWeekday } from "@/utils/date";
import React, { useState } from "react";
import Title from "../atoms/Title";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

type DayType = {
  day: number;
  state: "prev" | "cur" | "next";
};

export default function Calendar() {
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];
  const [date, setDate] = useState(new Date()); // 현재 날짜 상태

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    setDate((prevDate) => {
      const previousMonth = prevDate.getMonth() - 1;
      const day =
        prevDate.getMonth() - 1 && new Date().getMonth()
          ? new Date().getDate()
          : 1;
      return new Date(prevDate.getFullYear(), previousMonth, day);
    });
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    setDate((prevDate) => {
      const nextMonth = prevDate.getMonth() + 1;
      const day =
        prevDate.getMonth() + 1 && new Date().getMonth()
          ? new Date().getDate()
          : 1;
      return new Date(prevDate.getFullYear(), nextMonth, day);
    });
  };

  const renderCalendar = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = getFirstDayOfMonth(year, month);
    const daysInPrevMonth = getDaysInMonth(year, month - 1);
    const daysInMonth = getDaysInMonth(year, month);

    const start = daysInPrevMonth - firstDay + 1;

    const calendar: DayType[] = [];
    let nextMonday = 1;
    for (let i = 0; i < 42; i++) {
      if (i < firstDay) calendar.push({ day: start + i, state: "prev" });
      else if (i - firstDay + 1 > daysInMonth) {
        calendar.push({ day: nextMonday, state: "next" });
        nextMonday++;
      } else calendar.push({ day: i - firstDay + 1, state: "cur" });
    }
    return calendar;
  };

  return (
    <section className="w-full h-screen">
      <div className="flex items-center justify-center gap-8 p-4">
        <button className="text-3xl" onClick={goToPreviousMonth}>
          <AiFillCaretLeft />
        </button>
        <h1 className="text-3xl font-bold">{`${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월`}</h1>
        <button className="text-3xl" onClick={goToNextMonth}>
          <AiFillCaretRight />
        </button>
      </div>
      <div className="w-full h-3/5 border rounded-2xl overflow-hidden">
        <ul className="w-full h-[5%] grid grid-cols-7">
          {weeks.map((w, i) => (
            <li
              className={`flex items-center justify-center border ${
                w === getWeekday(date.getDay()) &&
                date.getMonth() === new Date().getMonth()
                  ? "text-yellow-400 font-bold"
                  : ""
              }`}
              key={i}
            >
              {w}
            </li>
          ))}
        </ul>
        <ul className="w-full h-[95%] grid grid-cols-7">
          {renderCalendar().map((day, i) => (
            <li
              key={i}
              className={`flex justify-center items-center cursor-pointer text-xl hover:text-yellow-500 hover:font-bold border border-gray-600 ${
                new Date().getMonth() === date.getMonth() &&
                date.getDate() === day.day
                  ? "bg-red-400 text-2xl font-bold"
                  : ""
              } ${i === 6 || i % 7 === 6 ? "text-blue-500" : ""} ${
                i === 0 || i % 7 === 0 ? "text-red-500" : ""
              } ${
                day.state === "prev" || day.state === "next"
                  ? "text-gray-600"
                  : ""
              }`}
            >
              {day.day}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
