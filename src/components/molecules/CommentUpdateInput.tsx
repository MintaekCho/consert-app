"use client";
import CommentService from "@/service/comment/Comment";
import React, { FormEvent, useState } from "react";
import { mutate } from "swr";

type Props = {
  artistId: string;
  commentId: string;
  handleUpdate: () => void;
};

export default function CommentUpdateInput({
  artistId,
  commentId,
  handleUpdate,
}: Props) {
  const [updateComment, setUpdateComment] = useState("");
  const commentApi = new CommentService();
  const commentBody = {
    commentId,
    content: updateComment,
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(commentBody);
    await commentApi.patchComment(artistId, commentBody);
    mutate(`/api/comment/${artistId}`);
    setUpdateComment("");
    handleUpdate();
  };
  return (
    <form className="w-full flex flex-col sm:flex-row  gap-2" onSubmit={handleSubmit}>
      <input
        className="w-full text-[10px] sm:text-sm p-2 rounded-lg text-black outline-none"
        type="text"
        value={updateComment}
        onChange={(e) => setUpdateComment(e.target.value)}
        placeholder="변경하실 내용을 입력해주세요."
      />
      <div className="flex gap-2 md:w-1/5">
        <input
          onClick={handleSubmit}
          className="p-1 w-8 text-[10px] sm:text-xs md:p-2 md:w-1/2 bg-purple-500 rounded-lg cursor-pointer text-white"
          type="button"
          value={"수정"}
        />
        <div
          onClick={handleUpdate}
          className="p-1 w-8 text-[10px] sm:text-xs md:p-2 md:w-1/2 bg-purple-500 rounded-lg flex justify-center items-center cursor-pointer"
        >
          <p className="text-white">취소</p>
        </div>
      </div>
    </form>
  );
}
