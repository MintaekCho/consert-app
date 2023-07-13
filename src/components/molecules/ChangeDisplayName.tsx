"use client";
import { patchApi } from "@/service/api/api";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";

export default function ChangeDisplayName() {
  const { data: session, update } = useSession();

  const [isChange, setIsChange] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!displayName || displayName.length > 9) {
      setErrorMessage("닉네임은 1자이상 8자이하로 입력해주세요. ");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }
    setIsChange(!isChange);

    await patchApi("/user", {
      body: {
        id: session?.user.id,
        displayName,
      },
    }).then((res) => {
        console.log(res)
      update({ displayName });
      setDisplayName("");
    });
  };

  return (
    <div className="mt-2">
      {isChange ? (
        <form className="w-full relative mt-8" onSubmit={handleSubmit}>
          <input
            className="px-2 py-1 rounded-lg text-black outline-none"
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            placeholder={"닉네임을 입력해주세요."}
          />
          <div className="mt-2 flex gap-2 justify-center font-bold ">
            <input
              className="px-2 py-1 bg-purple-600 rounded-lg hover:opacity-90 cursor-pointer"
              type="button"
              value={"확인"}
              onClick={handleSubmit}
            />
            <div
              className="px-2 py-1 bg-red-600 rounded-lg hover:opacity-90 cursor-pointer"
              onClick={() => setIsChange(!isChange)}
            >
              취소
            </div>
          </div>
          {errorMessage && (
            <p className="text-xs text-red-500 font-bold text-left absolute -top-6 left-1/2 -translate-x-1/2">
              {errorMessage}
            </p>
          )}
        </form>
      ) : (
        <button
          className="px-2 py-1 bg-purple-600 rounded-lg font-bold hover:opacity-90"
          onClick={() => setIsChange(!isChange)}
        >
          닉네임 변경
        </button>
      )}
    </div>
  );
}
