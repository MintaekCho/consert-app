"use client";
import Artist from "@/service/artist/Artist";
import Image from "next/image";
import React from "react";
import useSWR from "swr";
import ArtistAlbums from "../organisms/ArtistAlbums";
import Title from "../atoms/Title";
import YoutubeView from "../organisms/YoutubeView";
import ArtistConsert from "../organisms/ArtistConsert";
import ArtistComments from "../organisms/ArtistComments";
import { ArtistData } from "@/types/_type";
import Loading from "../common/Loading";
import Tabbar from "../molecules/Tabbar";
import { useTab } from "@/hooks/useTab";

export default function ArtistInfo({ artistId }: { artistId: string }) {
  const navCategory = ["콘서트", "앨범", "팬명록"];
  const { curIndex, curItem, changeItem } = useTab({
    init: 0,
    tabList: navCategory,
  });

  const artistApi = new Artist();
  const { data, isLoading, error } = useSWR(`/api/artist/${artistId}`, () =>
    artistApi.getArtistInfo(artistId)
  );

  const artist: ArtistData = data && data.data;
  return (
    <section className="p-8">
      {isLoading && <Loading />}
      {error && <p>Error!!</p>}
      {artist && (
        <>
          <div className="mb-4 md:mb-8 flex justify-center flex-col items-center md:justify-around md:flex-row">
            <div className="flex items-center gap-2">
              <Title>{artist.korName}</Title>
              {artist.enName && <p>{artist.enName}</p>}
            </div>
            <Image
              className="rounded-md"
              src={artist.profile}
              alt={artist.korName}
              width={400}
              height={400}
              style={{ height: "400px", objectFit: "cover" }}
              priority
            />
          </div>
          <section className="border-b">
            <Tabbar
              tabItems={navCategory}
              curIndex={curIndex}
              changeItem={changeItem}
            />
            {curItem === "콘서트" && <ArtistConsert artist={artist} />}
            {curItem === "앨범" && <ArtistAlbums artist={artist} />}
            {curItem === "팬명록" && <ArtistComments />}
          </section>
          <YoutubeView artistName={artist.korName} />
        </>
      )}
    </section>
  );
}
