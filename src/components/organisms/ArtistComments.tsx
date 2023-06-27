import CommentService from "@/service/comment/Comment";
import { CommentData } from "@/types/_type";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import useSWR from "swr";
import ComentInput from "../molecules/ComentInput";
import CommentCard from "../molecules/CommentCard";

export default function ArtistComments() {
  const pathName = usePathname();
  const artistId = pathName?.split("/")[2] as string;
  const commentApi = new CommentService();

  const { data, isLoading, error } = useSWR(`/api/comment/${artistId}`, () =>
    commentApi.getComments(artistId)
  );

  const comments: CommentData[] = data?.data;
  console.log(comments);
  return (
    <div
      className={`w-full h-[500px] flex flex-col items-center ${
        comments?.length === 0 ? "justify-center" : ""
      } gap-2 p-4 rounded-xl bg-gray-950 relative`}
    >
      {comments?.length !== 0 ? (
        <ul className="w-full h-[90%] flex flex-col gap-4 overflow-auto">
          {comments?.map((comment) => (
            <li key={comment._id}>
              <CommentCard comment={comment} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-2xl font-bold">
          가장 먼저 응원하는 글을 남겨주세요😍
        </p>
      )}

      <ComentInput artistId={artistId} />
    </div>
  );
}
