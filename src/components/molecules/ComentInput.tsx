"use client";
import CommentService from "@/service/comment/Comment";
import { validateWhiteSpace } from "@/utils/validation";
import { signIn, useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";
import { mutate } from "swr";
import ErrorMessage from "../atoms/ErrorMessage";
import useSWR from "swr";
import Modal from "../common/Modal";

export default function ComentInput({ artistId }: { artistId: string }) {
  const [comment, setComment] = useState("");
  const commentApi = new CommentService();
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const handleVisible = () => setModalVisible(!modalVisible);

  const { data } = useSWR(`/api/comment/${artistId}`, () =>
    commentApi.getComments(artistId)
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // TODO: 나중에 로그인 에러 모달로 변경
    if (!session) {
      setErrorMessage("팬명록을 남기려면 로그인이 필요합니다.");
      handleVisible();
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      setComment("");
      return;
    }
    const isWhiteSpace = validateWhiteSpace(comment);
    if (!comment || isWhiteSpace) {
      setErrorMessage("응원글을 한 글자 이상 입력해주세요.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      setComment("");
    } else {
      const { data: res } = await commentApi.postComment(
        {
          content: comment,
          writer: session?.user,
        },
        artistId
      );
      console.log(res);
      mutate(`/api/comment/${artistId}`);
      setComment("");
    }
  };
  return (
    <>
      {modalVisible && (
        <Modal
          description="로그인이 후 이용 가능합니다."
          buttonText="로그인"
          onClick={signIn}
          setVisible={handleVisible}
        />
      )}
      <section className="w-full h-[10%] left-0 bottom-0">
        <form onSubmit={handleSubmit} className="w-full">
          <input
            className="w-[85%] p-3 outline-none text-black rounded-l-lg"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="가수에게 응원글을 남겨주세요."
          />
          <input
            type="button"
            onClick={handleSubmit}
            value={"전송"}
            className="w-[15%] py-3 rounded-r-lg font-bold bg-purple-500 cursor-pointer text-white hover:bg-purple-600"
          />
        </form>
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </section>
    </>
  );
}
