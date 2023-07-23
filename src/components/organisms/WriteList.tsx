"use client";
import { getApi } from "@/service/api/api";
import { WriteData } from "@/types/_type";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import GuideTxt from "../atoms/GuideTxt";
import Pagination from "../atoms/Pagination";
import Title from "../atoms/Title";
import Loading from "../common/Loading";
import WriteCard from "../molecules/WriteCard";
import SearchBox from "./SearchBox";

export default function WriteList() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState<string | null>("");
  console.log(keyword);

  const params = {
    page,
    size: 12,
  };

  const { data, isLoading, error } = useSWR(`/api/write?page=${page}`, () =>
    getApi("/write", {
      params,
    })
  );

  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
  } = useSWR(
    `/api/write/search?keyword=${keyword}&page=${page}`,
    () =>
      getApi(`/write/search`, {
        params: { ...params, keyword },
      }),
    {
      revalidateOnMount: page !== 1,
    }
  );
  console.log(page, data?.result.pageCount)


  useEffect(() => {
    mutate(`/api/write/search?keyword=${keyword}&page=${page}`);
  }, [keyword, page]);

  return (
    <>
      <SearchBox
        setKeyword={setKeyword}
        placeholder={"찾고 계신 글이 있으신가요?"}
      />
      <div className="flex items-end gap-2 border-b-2 border-purple-600 py-4 mb-4">
        <h1 className="font-bold">게시판</h1>
        <p className="text-[10px] md:text-sm text-gray-300">
          콘서트 후기, 일상 등을 공유해보세요!
        </p>
      </div>
      {isLoading ? (
        <Loading />
      ) : keyword ? (
        searchLoading ? (
          <Loading />
        ) : searchData?.result.findWrite.length === 0 ? (
          <GuideTxt>게시글이 존재하지 않습니다.</GuideTxt>
        ) : (
          <>
            <ul>
              {searchData?.result.findWrite.map((w: WriteData) => (
                <li key={w._id}>
                  <WriteCard write={w} />
                </li>
              ))}
            </ul>
            <Pagination
              setPage={setPage}
              page={page}
              lastPage={searchData?.result?.pageCount}
            />
          </>
        )
      ) : (
        <>
          <ul>
            {data?.result.findWrite.map((w: WriteData) => (
              <li key={w._id}>
                <WriteCard write={w} />
              </li>
            ))}
          </ul>
          <Pagination
            setPage={setPage}
            page={page}
            lastPage={data?.result?.pageCount}
          />
        </>
      )}
    </>
  );
}
