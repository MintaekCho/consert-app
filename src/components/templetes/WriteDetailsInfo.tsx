"use client";
import { getApi } from "@/service/api/api";
import { useSession } from "next-auth/react";
import React from "react";
import useSWR from "swr";
import Title from "../atoms/Title";
import Loading from "../common/Loading";
import WriteUDBtnWrap from "../molecules/WriteUDBtnWrap";
import WriteComment from "../organisms/WriteComment";
import WriteCommentList from "../organisms/WriteCommentList";

export default function WriteDetailsInfo({ writeId }: { writeId: string }) {
  const DES_STYLE = "text-gray-400 font-bold";
  const { data, isLoading, error } = useSWR(`/api/write/${writeId}`, () =>
    getApi(`/write/${writeId}`)
  );
  const { data: session, status } = useSession();

  return isLoading || status === "loading" ? (
    <Loading />
  ) : (
    <section className="mt-8">
      <div className="border-b p-2">
        <Title textColor={"text-purple-600"}>{data?.result.title}</Title>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className={`${DES_STYLE}`}>{data?.result.writer.displayName}</span>
            <div className="flex gap-2 py-2 mb-4">
              <span className={DES_STYLE}>{data?.result.createdAt}</span>
              {data?.result.isUpdated ? (
                <>
                  <span className={DES_STYLE}> | </span>
                  <span className={DES_STYLE}>(수정됨) - {data?.result.updatedAt}</span>
                </>
              ) : null}
            </div>
          </div>
          {session?.user.email === data?.result.writer.email ? (
            <WriteUDBtnWrap data={data?.result} />
          ) : null}
        </div>
      </div>
      <div className="w-full min-h-[250px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] px-2 py-8">
        <div dangerouslySetInnerHTML={{ __html: data?.result.content }} />
      </div>
      <div>
        <h2 className="mb-4">Comment</h2>
        <WriteCommentList />
        <WriteComment />
      </div>
    </section>
  );
}
