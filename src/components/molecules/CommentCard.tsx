"use client";
import { CommentData } from "@/types/_type";
import Image from "next/image";
import React, { useState } from "react";
import CommentDeleteIcon from "../atoms/icons/CommentDeleteIcon";
import CommentUpdateIcon from "../atoms/icons/CommentUpdateIcon";
import CommentUpdateInput from "./CommentUpdateInput";

export default function CommentCard({ comment }: { comment: CommentData }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const handleUpdate = () => setIsUpdate(!isUpdate);

  const { _id, artistId, writer, content, createdAt, updatedAt, isUpdated } =
    comment;
  const createdDate = createdAt?.split("G")[0];
  const updatedDate = updatedAt?.split("G")[0];
  console.log(createdAt);
  return (
    <article className="w-full h-20 px-8 py-2 bg-slate-700 rounded-xl flex items-center">
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex items-center gap-10">
          <div className="flex flex-col gap-1 items-center">
            <Image
              className="max-h-[40px] rounded-full"
              src={`${writer?.image}`}
              alt="프로필이미지"
              width={40}
              height={40}
            />
            <span className="text-xs">{writer?.name}</span>
          </div>
          {isUpdate ? (
            <CommentUpdateInput
              artistId={artistId}
              commentId={_id}
              handleUpdate={handleUpdate}
            />
          ) : (
            <div className="w-full flex flex-col gap-2 items-start">
              <p>{content}</p>
              {
                <div className="flex gap-4">
                  {isUpdated ? (
                    <>
                      <span className="text-gray-400 text-sm">{`${createdDate}`}</span>
                      <span className="text-gray-400 text-sm">{`(수정됨) - ${updatedDate}`}</span>
                    </>
                  ) : (
                    <span className="text-gray-400 text-sm">{`${createdDate}`}</span>
                  )}
                </div>
              }
            </div>
          )}
        </div>
        {isUpdate ? null : (
          <div className="flex gap-2">
            <CommentUpdateIcon handleUpdate={handleUpdate} />
            <CommentDeleteIcon commentId={_id} artistId={artistId} />
          </div>
        )}
      </div>
    </article>
  );
}
