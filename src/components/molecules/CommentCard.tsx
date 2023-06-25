import Image from "next/image";
import React from "react";
import CommentDeleteIcon from "../atoms/icons/CommentDeleteIcon";
import CommentUpdateIcon from "../atoms/icons/CommentUpdateIcon";

export default function CommentCard() {
  return (
    <article className="w-full h-20 px-8 py-2 bg-slate-700 rounded-xl flex items-center">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center justify-center gap-10">
          <div className="flex flex-col gap-1 items-center">
            <Image className="max-h-[40px] rounded-full" src='/assets/profile.jpeg' alt="프로필이미지" width={40} height={40} />
            <span className="text-xs">작성자</span>
          </div>
          <div className="flex flex-col gap-2 items-start">
            <p>안녕하세여. 파이팅!</p>
            <span className="text-gray-500 text-sm">2023.06.26</span>
          </div>
        </div>
        <div className="flex gap-2">
          <CommentUpdateIcon />
          <CommentDeleteIcon />
        </div>
      </div>
    </article>
  );
}
