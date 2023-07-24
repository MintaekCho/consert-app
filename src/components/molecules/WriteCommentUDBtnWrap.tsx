import { isupdateWriteCommentState, loadingState } from "@/atom";
import { deleteApi } from "@/service/api/api";
import { SessionUser, WriteCommentData } from "@/types/_type";
import { useSession } from "next-auth/react";
import React from "react";
import { useRecoilState } from "recoil";
import { mutate } from "swr";
import WriteBtn from "../atoms/WriteBtn";

export default function WriteCommentUDBtnWrap({
  item,
  user,
}: {
  item: WriteCommentData;
  user: SessionUser;
}) {
  const [isUpdate, setIsUpdate] = useRecoilState(isupdateWriteCommentState);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  const { data: session, status } = useSession();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteApi(`/writeComment/${item.writeId}/${item._id}`).then(() => {
      setIsLoading(false);
      mutate(`/api/writeComment/${item.writeId}`);
      mutate(`/api/write`);
    });
  };

  return status === "authenticated" && session?.user === user ? (
    <div className="flex gap-2">
      <WriteBtn
        text={"수정"}
        style={
          "bg-purple-600 px-3 py-1 text-sm rounded-full font-bold hover:opacity-90"
        }
        onClick={() => setIsUpdate({ id: item._id, isUpdate: true })}
      />
      <WriteBtn
        text={"삭제"}
        style={
          "bg-red-600 px-3 py-1 text-sm rounded-full font-bold hover:opacity-90"
        }
        onClick={handleDelete}
      />
    </div>
  ) : null;
}
