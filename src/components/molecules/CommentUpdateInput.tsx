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
    <form className="w-full flex gap-2" onSubmit={handleSubmit}>
      <input
        className="w-full p-3 rounded-lg text-black outline-none"
        type="text"
        value={updateComment}
        onChange={(e) => setUpdateComment(e.target.value)}
        placeholder="변경하실 내용을 입력해주세요."
      />
      <input
        onClick={handleSubmit}
        className="p-2 w-[10%] bg-purple-500 rounded-lg cursor-pointer"
        type="button"
        value={"수정"}
      />
      {/* <button
        onClick={handleUpdate}
        className="p-2 w-[10%] bg-purple-500 rounded-lg"
      >
        취소
      </button> */}
    </form>
  );
}
