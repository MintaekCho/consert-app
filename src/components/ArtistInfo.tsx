"use client";
import Artist from "@/service/artist/Artist";
import Image from "next/image";
import React from "react";
import useSWR from "swr";
import { ArtistData } from "./ArtistList";

export default function ArtistInfo({ artistId }: { artistId: string }) {
  const artistApi = new Artist();
  const { data, isLoading, error } = useSWR("artistInfo", () =>
    artistApi.getArtistInfo(artistId)
  );
  console.log(data);

  const artist: ArtistData = data && data.data;
  return (
    <section>
      {isLoading && <p>Loading..</p>}
      {error && <p>Error!!</p>}
      {artist && (
        <Image
          src={
            "http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/23/04/0400012304_187914_01.251.gif"
          }
          alt={artist.korName}
          width={300}
          height={300}
        />
      )}
    </section>
  );
}
