"use client";
import React, { useState } from "react";

export default function ComentInput() {
  const [comment, setComment] = useState("");
  const handleSubmit = () => {};
  return (
    <section className="w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <input
          className="w-[85%] p-3 outline-none text-black rounded-l-lg"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="가수에게 응원글을 남겨주세요."
        />
        <input
          type="button"
          value={"전송"}
          className="w-[15%] py-3 rounded-r-lg font-bold bg-purple-500 cursor-pointer hover:bg-purple-600"
        />
      </form>
    </section>
  );
}
