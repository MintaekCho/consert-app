"use client";
import ConcertInfiniteScroll from "@/components/templetes/ConcertInfiniteScroll";
import Title from "@/components/atoms/Title";
import ConcertList from "@/components/organisms/ConcertList";
import SearchBox from "@/components/organisms/SearchBox";
import { useState } from "react";

const Page = () => {
  const [keyword, setKeyword] = useState<string | null>("");
  return (
    <div>
      <SearchBox setKeyword={setKeyword} placeholder={'어떤 아티스트의 공연을 찾고 있나요?'} />
      {keyword ? (
        <>
          <Title>{keyword} Concert</Title>
          <ConcertList keyword={keyword} />
        </>
      ) : (
        <>
          <Title>All Concert</Title>
          <ConcertInfiniteScroll />
        </>
      )}
    </div>
  );
};

export default Page;
