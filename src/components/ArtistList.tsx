"use client";
import Artist from "@/service/artist/Artist";
import React, { useState } from "react";
import useSWR from "swr";
import ArtistCard from "./ArtistCard";

export type RecentConsert = {
  title: string;
  consertLink: string;
};

export type ArtistData = {
  _id: string;
  profile: string;
  recentConserts: RecentConsert[];
  korName: string;
  enName: string;
};

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

  const { data, error, isLoading } = useSWR(
    `api/artist/search/${keyword}`,
    () => artistApi.getSearchArtists(params)
  );

  const artists: ArtistData[] = data && data.data;

  // const filteredArtists = artists?.filter((artist) => {
  //   const korKeyword = artist.korName.includes(keyword || "");
  //   const enKeyword = artist.enName.includes(keyword || "");
  //   return korKeyword || enKeyword;
  // });

  return (
    <section className=" mt-8">
      {isLoading && <p>loading...</p>}
      {error && <p>error!!!</p>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {artists &&
          artists.map((artist) => (
            <li key={artist._id}>
              <ArtistCard artist={artist} />
            </li>
          ))}
      </ul>
      {artists && artists.length === 0 && <p className="text-xl text-gray-400 font-bold text-center">찾고계신 가수가 없네요🥹</p> }
    </section>
  );
}
