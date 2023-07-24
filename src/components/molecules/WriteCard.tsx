import { getApi } from "@/service/api/api";
import { WriteData } from "@/types/_type";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

export default function WriteCard({ write }: { write: WriteData }) {

  return (
    <Link
      href={`/community/details/${write._id}`}
      className="w-full flex items-center justify-between  border-b p-4 group"
    >
      <div className="flex flex-col">
        <div className="flex gap-1 group-hover:translate-x-4 duration-200">
          <p className="group-hover:text-red-400 group-hover:scale-105 duration-200">
            {write.title}
          </p>
          {write.commentCount ? <span>[{write.commentCount}]</span> : null}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-500">{write.writer?.displayName}</span>
            {/* <span className="text-gray-500">{write.viewCount}</span> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-gray-500">{write.createdAt}</p>
        {write.isUpdated && (
          <p className="text-gray-500">(수정됨) - {write.updatedAt}</p>
        )}
      </div>
    </Link>
  );
}
