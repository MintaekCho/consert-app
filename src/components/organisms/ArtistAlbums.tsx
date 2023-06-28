import React from "react";
import useSWR from "swr";
import Artist from "@/service/artist/Artist";
import AlbumCard from "../molecules/AlbumCard";
import { AlbumData, ArtistData } from "@/types/_type";
import Title from "../atoms/Title";
import Loading from "../common/Loading";

export default function ArtistAlbums({ artist }: { artist: ArtistData }) {
  const artistApi = new Artist();

  const { data, isLoading, error } = useSWR(
    `/api/consert/album/${artist.korName}`,
    () => artistApi.getArtistAlbums(artist.korName),
    {
      refreshInterval: 1000 * 60 * 30,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const albums: AlbumData[] = data && data.data;

  return (
    <div className="w-full h-[500px] overflow-auto flex-col items-center justify-center flex p-4 rounded-xl bg-gray-950 relative">
      <Title>📗 Album</Title>
      <button className="absolute top-16 right-16 font-bold text-[#c4c4c4] hover:text-white">
        모든 앨범 보기
      </button>{" "}
      {/* TODO: 모든앨범보기 모달 */}
      {isLoading && <Loading />}
      {error && <p>error</p>}
      <ul className="w-full flex gap-10">
        {albums &&
          (albums.length === 0 ? (
            <p className="text-white">🥹준비중입니다.</p>
          ) : (
            albums.map((album) => (
              <li key={album.title}>
                <AlbumCard album={album} />
              </li>
            ))
          ))}
      </ul>
    </div>
  );
}
