import {
  writeContentState,
  writeTitleState,
  writeTitleValidateState,
} from "@/atom";
import { useMemo } from "react";
import { useRecoilState } from "recoil";

export function useForm() {
  const [title, setTitle] = useRecoilState(writeTitleState);
  const [content, setContent] = useRecoilState(writeContentState);
  const [titleValidate, setTitleValidate] = useRecoilState(
    writeTitleValidateState
  );

  

  const memoizedFormState = useMemo(() => ({
    title,
    setTitle,
    content,
    setContent,
    titleValidate,
    setTitleValidate,
  }), [title, setTitle, content, setContent, titleValidate, setTitleValidate]);

  return memoizedFormState
}
