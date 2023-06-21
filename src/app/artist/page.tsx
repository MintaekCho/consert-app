"use client";

import ArtistList from "@/components/ArtistList";
import SearchBox from "@/components/SearchBox";
import Title from "@/components/common/Title";
import React, { useState } from "react";

export default function Page() {
  const [keyword, setKeyword] = useState<string | null>("");
  return (
    <div>
      <SearchBox setKeyword={setKeyword} />
      <Title>All Artists</Title>
      <ArtistList keyword={keyword} />
    </div>
  );
}
