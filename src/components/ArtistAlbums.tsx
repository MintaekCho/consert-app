import React from "react";
import { ArtistData } from "./ArtistList";
import useSWR from 'swr'
import Artist from "@/service/artist/Artist";

export default function ArtistAlbums({ artist }: { artist: ArtistData }) {
  const artistApi = new Artist();

  const { data, isLoading, error } = useSWR(
    `/api/consert/album/${artist.korName}`,
    () => artistApi.getArtistAlbums(artist.korName)
  );

  const albums = data && data.data
  console.log(albums);

  return (
    <div className="w-full h-[400px] overflow-auto flex gap-10 px-4 py-8 rounded-xl bg-gray-950">
      album
    </div>
  );
}
