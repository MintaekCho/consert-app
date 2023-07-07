import CommentService from "@/service/comment/Comment";
import { CommentData } from "@/types/_type";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import useSWR from "swr";
import Loading from "../common/Loading";
import ComentInput from "../molecules/ComentInput";
import CommentCard from "../molecules/CommentCard";
import GuideTxt from "../atoms/guideTxt";

export default function ArtistComments() {
  const pathName = usePathname();
  const artistId = pathName?.split("/")[2] as string;
  const commentApi = new CommentService();

  const { data, isLoading, error } = useSWR(`/api/comment/${artistId}`, () =>
    commentApi.getComments(artistId)
  );

  const comments: CommentData[] = data?.data;
  return (
    <div
      className={`w-full h-[500px] flex flex-col items-center p-2 ${
        comments?.length === 0 || isLoading ? "justify-center" : ""
      } gap-2 sm:p-4 rounded-xl relative`}
    >
      {isLoading && <Loading />}
      {comments?.length !== 0 ? (
        <ul className="w-full h-[90%] flex flex-col gap-4 overflow-auto">
          {comments?.map((comment) => (
            <li key={comment._id}>
              <CommentCard comment={comment} />
            </li>
          ))}
        </ul>
      ) : (
        <GuideTxt>가장 먼저 응원하는 글을 남겨주세요.</GuideTxt>
      )}

      <ComentInput artistId={artistId} />
    </div>
  );
}
