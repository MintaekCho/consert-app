"use client";
import ReactQuill from "react-quill";
import { useForm } from "@/hooks/useForm";
import { useMemo, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import AWS from "aws-sdk";

export default function Editor() {
  const quillRef = useRef(null);
  const REGION = process.env.NEXT_PUBLIC_AWS_S3_REGION;
  const ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY;
  const SECRET_KEY = process.env.NEXT_PUBLIC_AWS_S3_SECRET_KEY;
  const BUCKET_NAME = process.env.NEXT_PUBLIC_AWS_S3_NAME;

  const imageHaneler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      console.log(file);
      try {
        const name = Date.now();

        AWS.config.update({
          region: REGION,
          accessKeyId: ACCESS_KEY,
          secretAccessKey: SECRET_KEY,
        });
        const upload = new AWS.S3.ManagedUpload({
          params: {
            ACL: "public-read",
            Bucket: BUCKET_NAME as string,
            Key: `upload/${name}`,
            Body: file,
          },
        });

        const url_key = await upload.promise().then((res) => res.Location);
        console.log(url_key);
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();

        editor.insertEmbed(range.index, "image", url_key);
      } catch (e) {
        console.log(e);
      }
    });
  };
  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#toolbar",
        handlers: {
          image: imageHaneler,
        },
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
        ref={quillRef}
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
