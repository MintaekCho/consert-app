'use client'
import { useForm } from "@/hooks/useForm";
import React from "react";

export default function TitleInput() {
    const {title, setTitle, titleValidate} = useForm();

  return (
    <input
      type="text"
      className={`w-5/6 mx-auto bg-black border-b ${
        titleValidate ? "placeholder:text-red-500" : ""
      } border-gray-500 p-2 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl outline-none`}
      placeholder="제목을 입력해주세요."
      onChange={(e) => setTitle(e.target.value)}
      value={title}
    />
  );
}
