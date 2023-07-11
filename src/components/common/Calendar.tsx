import { getDaysInMonth, getFirstDayOfMonth, getWeekday } from "@/utils/date";
import React, { useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

type Props = {
  selectDate: Date;
  setSeleteDate: (date: Date, day: number) => void;
};

type DayType = {
  day: number;
  state: "prev" | "cur" | "next";
};

export default function Calendar({ selectDate, setSeleteDate }: Props) {
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
    <section className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[900px]">
      <div className="flex items-center justify-center gap-8 p-4">
        <button className="text-3xl" onClick={goToPreviousMonth}>
          <AiFillCaretLeft />
        </button>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{`${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월`}</h1>
        <button className="text-3xl" onClick={goToNextMonth}>
          <AiFillCaretRight />
        </button>
      </div>
      <div className="w-full h-[80%] border rounded-2xl overflow-hidden">
        <ul className="w-full h-[10%] grid grid-cols-7">
          {weeks.map((w, i) => (
            <li
              className={`flex items-center justify-center border text-sm sm:text-md md:text-lg lg:text-xl ${
                w === getWeekday(date.getDay()) &&
                date.getMonth() === new Date().getMonth()
                  ? "text-green-500 font-bold"
                  : ""
              }`}
              key={i}
            >
              {w}
            </li>
          ))}
        </ul>
        <ul className="w-full h-[90%] grid grid-cols-7">
          {renderCalendar().map((day, i) => (
            <li
              key={i}
              onClick={() => {
                if (day.state === "prev" || day.state === "next") return;
                else setSeleteDate(date, day.day);
              }}
              className={`flex justify-center items-center group  text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl border border-gray-600 ${
                i % 7 === 0 && day.state !== "prev" && day.state !== "next"
                  ? "text-red-500"
                  : ""
              } ${
                i === 6 ||
                (i % 7 === 6 && day.state !== "prev" && day.state !== "next")
                  ? "text-blue-500"
                  : ""
              } ${
                date.getMonth() === selectDate.getMonth() &&
                day.day === selectDate.getDate() &&
                day.state !== "prev" &&
                day.state !== "next"
                  ? "text-yellow-300 font-bold"
                  : ""
              } ${
                day.state === "prev" || day.state === "next"
                  ? "text-gray-600 !important disabled "
                  : ""
              } ${
                day.state !== "prev" && day.state !== "next"
                  ? "hover:text-green-500 hover:font-bold cursor-pointer"
                  : ""
              }`}
            >
              <span
                className={`px-2 py-1 rounded-md ${
                  day.state !== "prev" && day.state !== "next"
                    ? "group-hover:scale-110 duration-300"
                    : ""
                } ${
                  new Date().getMonth() === date.getMonth() &&
                  date.getDate() === day.day
                    ? "bg-red-400 text-2xl font-bold"
                    : ""
                }`}
              >
                {day.day}일
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
