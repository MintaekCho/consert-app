"use client";
import Artist from "@/service/artist/Artist";
import { ArtistData } from "@/types/_type";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import ArtistWrap from "../ArtistWrap";
import Pagination from "../atoms/Pagination";

export interface ArtistListProps {
  keyword: string | null;
}
export default function ArtistList({ keyword }: ArtistListProps) {
  const [page, setPage] = useState(1);

  const artistApi = new Artist();

  const params = {
    name: keyword,
    page,
    size: 10,
  };

  useEffect(() => {
    mutate(`api/artist/search/${keyword}`, page);
  }, [keyword, page]);

  const { data, error, isLoading } = useSWR(
    `api/artist/search/${keyword}`,
    () => {
      return artistApi.getSearchArtists(params);
    },
    {
      revalidateOnMount: page !== 1,
    }
  );

  const artists: ArtistData[] = data && data.data;
  const lastPage = null; //총 페이지 수 혹은 총 데이터 수

  return (
    <section className=" mt-8">
      {isLoading && <p>loading...</p>}
      {error && <p>error!!!</p>}
      <ArtistWrap artists={artists} />
      {artists && artists.length === 0 && (
        <p className="text-xl text-gray-400 font-bold text-center">
          찾고계신 가수가 없네요🥹
        </p>
      )}
      <Pagination setPage={setPage} page={page} lastPage={lastPage} />
    </section>
  );
}
