"use client";
import {
  errorMessageState,
  isWriteUpdateState,
  loadingState,
  updateWriteIdState,
} from "@/atom";
import { useForm } from "@/hooks/useForm";
import { useModal } from "@/hooks/useModal";
import { patchApi, postApi } from "@/service/api/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { mutate } from "swr";
import ErrorMessage from "../atoms/ErrorMessage";
import WriteBtn from "../atoms/WriteBtn";
import Loading from "../common/Loading";
import Modal from "../common/Modal";

export default function WriteBtnWrap() {
  const { data: session, status } = useSession();
  const {
    title,
    content,
    setTitle,
    setContent,
    titleValidate,
    setTitleValidate,
  } = useForm();
  const { modalVisible, setModalVisible, modalDes, setModalDes } = useModal();

  const [isWriteUpdate, setIsWriteUpdate] = useRecoilState(isWriteUpdateState);
  const [updateWriteId, setUpdateWriteId] = useRecoilState(updateWriteIdState);

  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const body = {
    title: title.trim(),
    content,
    writer: session?.user,
  };

  const updateBody = {
    title: title.trim(),
    content,
  };

  const route = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      route.push("/");
    }
  }, [route, status]);

  const isValidate = () => {
    if (!title || !content || content === "<p><br></p>") {
      if (!title) {
        setTitleValidate(!titleValidate);
        setTimeout(() => {
          setTitleValidate(false);
        }, 3000);
      }
      if (!content || content === "<p><br></p>") {
        setErrorMessage("내용을 한글자 이상 입력해주세요.");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    try {
      if (isValidate()) {
        if (isWriteUpdate) {
          setIsLoading(true);
          await patchApi(`/write/${updateWriteId}`, {
            body: updateBody,
          })
            .then(() => {
              mutate(`/api/write/${updateWriteId}`);
            })
            .then(() => {
              setUpdateWriteId("");
              route.push(`/community/details/${updateWriteId}`);
            });
          setIsWriteUpdate(false);
        } else {
          await postApi("/write", {
            body,
          })
            .then(() => {
              mutate(`/api/write?page=1&size=12&keyword=''`);
            })
            .then(() => route.push("/community"));
        }
      } else return;
    } finally {
      setTitle("");
      setContent("");
      setIsLoading(false);
    }
  };

  const handleCancle = () => {
    route.push("/community");
    setModalVisible(!modalVisible);
    setTitle("");
    setContent("");
    setIsWriteUpdate(false);
    setModalDes("");
  };

  return (
    <>
      {modalVisible && (
        <Modal
          description={modalDes}
          isCancelBtn={true}
          buttonText={"확인"}
          onClick={handleCancle}
          setVisible={() => setModalVisible(!modalVisible)}
        />
      )}
      <div className="w-5/6 mx-auto flex gap-2 items-center justify-end relative">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <WriteBtn text="완료" onClick={handleSubmit} />
            <WriteBtn
              text="취소"
              style="bg-red-500 px-6 py-2 rounded-full font-bold hover:opacity-90"
              routeUrl={"/community"}
              onClick={() => {
                setModalDes("저장안되는데 나갈거?");
                setModalVisible(!modalVisible);
              }}
            />
          </>
        )}
        {errorMessage && (
          <div className="absolute left-0 top-0">
            <ErrorMessage message={errorMessage} />
          </div>
        )}
      </div>
    </>
  );
}
