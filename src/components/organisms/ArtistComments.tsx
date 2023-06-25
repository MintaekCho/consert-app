import React from "react";
import ComentInput from "../molecules/ComentInput";
import CommentCard from "../molecules/CommentCard";

export default function ArtistComments() {
  return (
    <div className="w-full h-[400px] flex flex-col gap-2 px-4 py-8 rounded-xl bg-gray-950">
      <ul className="w-full flex flex-col gap-4 overflow-auto">
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
      </ul>
      <ComentInput />
    </div>
  );
}
