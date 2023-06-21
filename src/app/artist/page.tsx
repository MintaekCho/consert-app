"use client";

import ArtistList from "@/components/ArtistList";
import ArtistInfiniteScroll from "@/components/ArtistInfiniteScroll";
import SearchBox from "@/components/SearchBox";
import Title from "@/components/common/Title";
import React, { useState } from "react";

export default function Page() {
  const [keyword, setKeyword] = useState<string | null>("");

  return (
    <div>
      <SearchBox setKeyword={setKeyword} />
      {keyword && (
        <>
          <Title>{keyword} 검색 결과</Title>
          <ArtistList keyword={keyword} />
        </>
      )}
      <Title>All Artists</Title>
      <ArtistInfiniteScroll />
    </div>
  );
}
