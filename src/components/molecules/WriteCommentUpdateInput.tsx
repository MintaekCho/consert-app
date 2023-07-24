import { isupdateWriteCommentState, loadingState } from "@/atom";
import { patchApi } from "@/service/api/api";
import { WriteCommentData } from "@/types/_type";
import { validateWhiteSpace } from "@/utils/validation";
import { usePathname } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { mutate } from "swr";
import ErrorMessage from "../atoms/ErrorMessage";
import Loading from "../common/Loading";

export default function WriteCommentUpdateInput({
  data,
}: {
  data: WriteCommentData;
}) {
  const writeId = usePathname()?.split("/")[3];

  const setIsUpdate = useSetRecoilState(isupdateWriteCommentState);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  const [comment, setComment] = useState(data.content);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isWhiteSpace = validateWhiteSpace(comment);
    if (!comment || isWhiteSpace) {
      setErrorMessage("댓글을 한 글자 이상 입력해주세요.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      setComment("");
    } else {
      setIsLoading(true);
      await patchApi(`/writeComment/${writeId}/${data._id}`, {
        body: {
          content: comment,
        },
      }).then(() => {
        setComment("");
        setIsLoading(false);
        setIsUpdate({ id: "", isUpdate: false });
        mutate(`/api/writeComment/${writeId}`);
      });
    }
  };
  return (
    <div className="w-[90%]">
      <form className="mt-2 flex flex-col items-end gap-2">
        <textarea
          className="w-full h-24 text-black p-2 outline-none"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={"댓글을 입력해주세요."}
        />
        <div className="flex gap-2">
          {isLoading ? (
            <Loading />
          ) : (
            <input
              type="button"
              onClick={handleSubmit}
              value={"수정하기"}
              className="py-1 px-2 rounded-md font-bold bg-purple-500 cursor-pointer text-white hover:bg-purple-600"
            />
          )}
          <div
            className="py-1 px-2 rounded-md font-bold bg-red-500 cursor-pointer text-white hover:bg-red-600"
            onClick={() => setIsUpdate({ id: "", isUpdate: false })}
          >
            취소
          </div>
        </div>
      </form>
      <div className="absolute left-0 bottom-2">
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </div>
    </div>
  );
}
