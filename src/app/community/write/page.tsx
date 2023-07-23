import Editor from "@/components/atoms/Editor";
import TitleInput from "@/components/atoms/TitleInput";
import WriteBtnWrap from "@/components/molecules/WriteBtnWrap";
import React from "react";

export default function page() {
  return (
    <section className="flex flex-col gap-4 mt-8">
      <TitleInput />
      <Editor />
      <WriteBtnWrap />
    </section>
  );
}
