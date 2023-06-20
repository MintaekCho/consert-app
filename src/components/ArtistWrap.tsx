"use client";
import Artist from "@/api/artist/Artist";
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

export default function ArtistWrap() {
  const [page, setPage] = useState(1);

  const artistApi = new Artist();

  const { data, error, isLoading } = useSWR("artists", () =>
    artistApi.getArtist(100, 10)
  );
  console.log(data);

  const artists: ArtistData[] = data && data.data;

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
    </section>
  );
}
