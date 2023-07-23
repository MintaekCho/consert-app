"use client";
import { useForm } from "@/hooks/useForm";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import Loading from "../common/Loading";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function Editor() {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#toolbar",
      },
    }),
    []
  );

  const { content, setContent } = useForm();

  const formats = useMemo(
    () => [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "list",
      "bullet",
      "align",
      "color",
      "background",
      "image",
    ],
    []
  );

  return (
    <div className="text-editor w-5/6 mx-auto bg-white text-black">
      <CustomToolbar />
      <ReactQuill
        className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] 2xl:h-[900px]"
        modules={modules}
        theme="snow"
        formats={formats}
        value={content}
        onChange={setContent}
        placeholder={"내용을 입력해주세요."}
      />
    </div>
  );
}

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header">
      <option value="1"></option>
      <option value="2"></option>
      <option value="3"></option>
      <option value="4"></option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <select className="ql-color">
      <option value="red"></option>
      <option value="green"></option>
      <option value="blue"></option>
      <option value="orange"></option>
      <option value="violet"></option>
      <option value="#d0d1d2"></option>
      <option selected></option>
    </select>
    <select className="ql-background"></select>
    <button className="ql-link"></button>
    <button className="ql-image"></button>
  </div>
);
