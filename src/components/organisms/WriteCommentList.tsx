import { getApi } from "@/service/api/api";
import { SessionUser, WriteCommentData } from "@/types/_type";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import useSWR from "swr";
import GuideTxt from "../atoms/GuideTxt";
import Loading from "../common/Loading";
import WriteCommentCard from "../molecules/WriteCommentCard";
export default function WriteCommentList() {
  const writeId = usePathname()?.split("/")[3];
  const { data: session } = useSession();
  const { data, isLoading, error } = useSWR(
    `/api/writeComment/${writeId}`,
    () => getApi(`/writeComment/${writeId}`)
  );
  return (
    <>
      {data?.result.length === 0 && (
        <div>
          <GuideTxt>가장 먼저 댓글을 작성해보세요!</GuideTxt>
        </div>
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <ul className="border-t-2 border-gray-600 mb-6">
          {data?.result.map((item: WriteCommentData) => (
            <li key={item._id}>
              <WriteCommentCard
                item={item}
                user={session?.user as SessionUser}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
