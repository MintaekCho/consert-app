import { postApi } from "@/service/api/api";
import { validateWhiteSpace } from "@/utils/validation";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { mutate } from "swr";
import ErrorMessage from "../atoms/ErrorMessage";
import Modal from "../common/Modal";

export default function WriteCommentInput() {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const writeId = usePathname()?.split("/")[3];
  console.log(writeId);

  const handleVisible = () => setModalVisible(!modalVisible);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isWhiteSpace = validateWhiteSpace(comment);
    if (!session) {
      setErrorMessage("댓글을 남기려면 로그인이 필요합니다.");
      handleVisible();
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      setComment("");
      return;
    } else if (!comment || isWhiteSpace) {
      setErrorMessage("댓글을 한 글자 이상 입력해주세요.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      setComment("");
    } else {
      await postApi(`/writeComment/${writeId}`, {
        body: {
          writeId,
          writer: session.user,
          content: comment,
        },
      }).then(() => {
        setComment("");
        mutate(`/api/writeComment/${writeId}`);
        mutate(`/api/write`)
      });
    }
  };

  return (
    <section className="relative">
      {modalVisible && (
        <Modal
          description="로그인이 후 이용 가능합니다."
          buttonText="로그인"
          isCancelBtn={true}
          onClick={signIn}
          setVisible={handleVisible}
        />
      )}
      <form className="mt-2 flex flex-col items-end gap-2">
        <textarea
          className="w-full h-24 text-black p-2 outline-none"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={"댓글을 입력해주세요."}
        />
        <input
          type="button"
          onClick={handleSubmit}
          value={"작성"}
          className="py-1 px-2 rounded-md font-bold bg-purple-500 cursor-pointer text-white hover:bg-purple-600"
        />
      </form>
      <div className="absolute left-0 bottom-2">
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </div>
    </section>
  );
}
