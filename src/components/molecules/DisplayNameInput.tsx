"use client";
import { patchApi } from "@/service/api/api";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Title from "../atoms/Title";
import Modal from "../common/Modal";
import Logo from "/src/app/logo_whitebg.png";

export default function DisplayNameInput() {
  const [displayName, setDisplayName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session, update } = useSession();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDisplayName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!displayName || displayName.length > 9) {
      setErrorMessage("닉네임은 1자이상 8자이하로 입력해주세요. ");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }
    await patchApi("/user", {
      body: {
        id: session?.user.id,
        displayName,
      },
    }).then((res) => {
      console.log(res);
      if (res.isSuccess === true) {
        update({ displayName });
        setModalVisible(!modalVisible);
      }
    });

    console.log(displayName);
  };

  useEffect(() => {
    if (!session || session?.user.displayName) router.replace("/");
  }, [session, router]);

  return (
    <section className="w-full flex flex-col gap-10 items-center justify-center">
      {modalVisible && (
        <Modal
          description="닉네임을 성공적으로 등록하였습니다."
          buttonText="확인"
          isCancelBtn={false}
          onClick={() => router.push("/")}
          setVisible={() => setModalVisible(!modalVisible)}
        />
      )}
      <Title>CONCON 에서 사용하실 닉네임을 설정해주세요.</Title>
      <Image src={Logo} alt={"logoImage"} />
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-2 justify-start items-center"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-start items-center relative">
          <div>
            <label className="font-bold hidden"> </label>
            <input
              className="px-4 py-1 rounded-xl text-black outline-none"
              placeholder="닉네임을 입력해주세요."
              type="text"
              onChange={handleChange}
              value={displayName}
            />
          </div>
          <input
            onClick={handleSubmit}
            className="px-4 py-1 font-bold cursor-pointer bg-purple-600 rounded-lg hover:opacity-90"
            type="button"
            value={"확인"}
          />
          {errorMessage && (
            <p className="w-full text-xs text-red-500 font-bold text-left absolute -top-6 left-1/2 -translate-x-1/2">
              {errorMessage}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
