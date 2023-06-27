import CommentService from "@/service/comment/Comment";
import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { mutate } from "swr";

export default function CommentDeleteIcon({
  commentId,
  artistId,
}: {
  commentId: string;
  artistId: string;
}) {
  const commentApi = new CommentService();
  const handleSubmit = async () => {
    await commentApi.deleteComment(commentId, artistId);
    mutate(`/api/comment/${artistId}`);
  };
  return (
    <div
      onClick={handleSubmit}
      className="bg-gray-300 rounded-full p-2 text-black cursor-pointer hover:opacity-90"
    >
      <BsFillTrashFill />
    </div>
  );
}
