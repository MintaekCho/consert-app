'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function MainBanner() {
  const BANNER_COUNT = 3;
  const banners: string[] = [];
  for (let i = 1; i <= BANNER_COUNT; i++) {
    banners.push(`/assets/consert_0${i}.jpg`);
  }

    const [count, setCount] = useState(0)
  useEffect(() => {
    setInterval(() => {
        setCount((prev) => prev === 2 ? prev - 2 : prev + 1)
    }, 5000)
  }, [])

  return (
    <section className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px] relative rounded-xl overflow-hidden">
      {banners.map((banner, i) => (
        <Image
          priority
          className={`w-full h-full opacity-60 ${count === i ? 'block' : 'hidden'}`}
          src={banner}
          alt={"배너이미지"}
          width={1200}
          height={600}
        />
      ))}
      <div className="font-bold flex flex-col gap-4 items-center absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl ">Consert-App</p>
        <p className="w-full text-xs md:text-md lg:text-lg xl:text-2xl">
          내가 좋아하는 가수의 콘서트 스케줄을 한눈에!!
        </p>
      </div>
    </section>
  );
}
