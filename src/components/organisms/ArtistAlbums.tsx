import React from "react";
import useSWR from "swr";
import Artist from "@/service/artist/Artist";
import AlbumCard from "../molecules/AlbumCard";
import { AlbumData, ArtistData } from "@/types/_type";
import Title from "../atoms/Title";
import Loading from "../common/Loading";
import GuideTxt from "../atoms/guideTxt";

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
    <div className="w-full h-[500px] flex-col items-center justify-center flex p-4 rounded-xl relative">
      <Title>Album</Title>
      <button className="text-sm md:absolute md:top-16 md:right-16 text-[#c4c4c4] hover:text-white">
        All Albums
      </button>{" "}
      {/* TODO: 모든앨범보기 모달 */}
      {isLoading && <Loading />}
      {error && <GuideTxt>준비중입니다.</GuideTxt>}
      {/* 스크롤 스타일링 */}
      <ul className="w-full mt-6 flex gap-10 overflow-x-auto overflow-y-hidden scroll-smooth">
        {albums &&
          (albums.length === 0 ? (
            <GuideTxt>준비중입니다.</GuideTxt>
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
