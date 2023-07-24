import TitleInput from "@/components/atoms/TitleInput";
import Loading from "@/components/common/Loading";
import WriteBtnWrap from "@/components/molecules/WriteBtnWrap";
import dynamic from "next/dynamic";
import React from "react";

const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function page() {
  return (
    <section className="flex flex-col gap-4 mt-8">
      <TitleInput />
      <Editor />
      <WriteBtnWrap />
    </section>
  );
}
