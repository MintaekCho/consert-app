"use client";
import {
  isWriteUpdateState,
  updateWriteIdState,
  writeContentState,
  writeTitleState,
} from "@/atom";
import { useForm } from "@/hooks/useForm";
import { useModal } from "@/hooks/useModal";
import { deleteApi } from "@/service/api/api";
import { WriteData } from "@/types/_type";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useSetRecoilState } from "recoil";
import { mutate } from "swr";
import WriteBtn from "../atoms/WriteBtn";
import Modal from "../common/Modal";

export default function WriteUDBtnWrap({ data }: { data: WriteData }) {
  const { data: session } = useSession();
  const setWriteUpdate = useSetRecoilState(isWriteUpdateState);
  const setUpdateWriteId = useSetRecoilState(updateWriteIdState);
  const route = useRouter();

  const { setTitle, setContent } = useForm();

  const { modalVisible, setModalVisible, modalDes, setModalDes } = useModal();

  const handleUpdate = () => {
    setUpdateWriteId(data._id);
    setTitle(data.title);
    setContent(data.content);
    setWriteUpdate(true);
    route.push("/community/write");
  };

  const handleDelete = async () => {
    try {
      await deleteApi(`/write/${data._id}`)
        .then(() => {
          setModalVisible(!modalVisible);
          mutate("/api/write?page=1");
        })
        .then(() => route.push("/community"));
    } finally {
      setModalDes("");
    }
  };

  return (
    <>
      {modalVisible && (
        <Modal
          description={modalDes}
          isCancelBtn={true}
          buttonText={"삭제"}
          onClick={handleDelete}
          setVisible={() => setModalVisible(!modalVisible)}
        />
      )}
      <div className="flex gap-2">
        <WriteBtn
          text={"수정"}
          style={
            "bg-purple-600 px-4 py-1 rounded-full font-bold hover:opacity-90"
          }
          onClick={handleUpdate}
        />
        <WriteBtn
          text={"삭제"}
          style={"bg-red-600 px-4 py-1 rounded-full font-bold hover:opacity-90"}
          onClick={() => {
            setModalDes("삭제하시겠습니까?");
            setModalVisible(!modalVisible);
          }}
        />
      </div>
    </>
  );
}
