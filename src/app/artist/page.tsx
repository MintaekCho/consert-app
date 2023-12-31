"use client";

import ArtistList from "@/components/organisms/ArtistList";
import ArtistInfiniteScroll from "@/components/templetes/ArtistInfiniteScroll";
import SearchBox from "@/components/organisms/SearchBox";
import Title from "@/components/atoms/Title";
import React, { useState } from "react";

export default function Page() {
  const [keyword, setKeyword] = useState<string | null>("");

  return (
    <div>
      <SearchBox setKeyword={setKeyword} placeholder={'어떤 아티스트의 공연을 찾고 있나요?'} />
      {keyword ? (
        <>
          <Title>{keyword} 검색 결과</Title>
          <ArtistList keyword={keyword} />
        </>
      ) : (
        <>
          <Title>All Artists</Title>
          <ArtistInfiniteScroll />
        </>
      )}
    </div>
  );
}
