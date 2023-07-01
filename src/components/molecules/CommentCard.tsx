"use client";
import { CommentData } from "@/types/_type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import CommentDeleteIcon from "../atoms/icons/CommentDeleteIcon";
import CommentUpdateIcon from "../atoms/icons/CommentUpdateIcon";
import CommentUpdateInput from "./CommentUpdateInput";

export default function CommentCard({ comment }: { comment: CommentData }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const handleUpdate = () => setIsUpdate(!isUpdate);
  const { data: session } = useSession();

  const { _id, artistId, writer, content, createdAt, updatedAt, isUpdated } =
    comment;

  const userCheck = session?.user.email === writer?.email;
  return (
    <article className="w-full px-4 md:px-8 py-2 bg-slate-700 rounded-xl flex items-center">
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex items-center gap-10">
          <div className="flex flex-col gap-1 items-center">
            <Image
              className="w-full max-h-[40px] rounded-full flex-shrink-0"
              src={`${writer?.image}`}
              alt="프로필이미지"
              width={40}
              height={40}
            />
            <span className="w-full text-center truncate text-[10px] sm:text-xs text-white">{writer?.name}</span>
          </div>
          {isUpdate ? (
            <CommentUpdateInput
              artistId={artistId}
              commentId={_id}
              handleUpdate={handleUpdate}
            />
          ) : (
            <div className="w-full flex flex-col gap-2 items-start">
              <p className="text-white text-xs sm:text-sm md:text-md lg:text-lg">{content}</p>
              {
                <div className="flex gap-4">
                  {isUpdated ? (
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-[10px] md:text-xs">{`${createdAt}`}</span>
                      <span className="text-gray-400 text-[10px] md:text-xs">{`(수정됨) - ${updatedAt}`}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-[10px] md:text-xs">{`${createdAt}`}</span>
                  )}
                </div>
              }
            </div>
          )}
        </div>
        {isUpdate ? null : userCheck ? (
          <div className="flex gap-2 text-[8px] sm:text-sm md:text-sm lg-text-lg">
            <CommentUpdateIcon handleUpdate={handleUpdate} />
            <CommentDeleteIcon commentId={_id} artistId={artistId} />
          </div>
        ) : null}
      </div>
    </article>
  );
}
