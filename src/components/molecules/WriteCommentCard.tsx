import { isupdateWriteCommentState } from "@/atom";
import { getApi } from "@/service/api/api";
import { SessionUser, WriteCommentData } from "@/types/_type";
import React from "react";
import { useRecoilValue } from "recoil";
import WriteCommentUDBtnWrap from "./WriteCommentUDBtnWrap";
import WriteCommentUpdateInput from "./WriteCommentUpdateInput";
import useSWR from "swr";

export default function WriteCommentCard({
  item,
  user,
}: {
  item: WriteCommentData;
  user: SessionUser;
}) {
  console.log(item);
  const isUpdate = useRecoilValue(isupdateWriteCommentState);
  const S_COLOR = "text-gray-500";
  const S_TEXT = "text-[10px] sm:text-sm";

  return (
    <article className="w-full py-4 px-2 border-b flex gap-2 items-start justify-between ">
      <div className="w-full flex gap-2">
        <span className={`${S_COLOR} w-[10%] ${S_TEXT}`}>
          {item?.writer?.displayName}
        </span>
        <div className="w-[90%] flex flex-col gap-2">
          {isUpdate.isUpdate && item._id === isUpdate.id ? (
            <WriteCommentUpdateInput data={item} />
          ) : (
            <p>{item.content}</p>
          )}
          {user?._id === item.writer?._id && isUpdate.id !== item._id ? (
            <WriteCommentUDBtnWrap item={item} />
          ) : null}
        </div>
      </div>
      {isUpdate.isUpdate ? null : item.isUpdated ? (
        <span className={`${S_COLOR} ${S_TEXT}`}>
          (수정됨) - {item.updatedAt}
        </span>
      ) : (
        <span className={`${S_COLOR} ${S_TEXT}`}>{item.createdAt}</span>
      )}
    </article>
  );
}
