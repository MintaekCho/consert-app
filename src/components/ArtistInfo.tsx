"use client";
import Artist from "@/service/artist/Artist";
import Image from "next/image";
import React, { MouseEvent, useState } from "react";
import useSWR from "swr";
import ArtistConsert from "./ArtistConsert";
import { ArtistData } from "./ArtistList";
import Navbar from "./common/Navbar";
import Title from "./common/Title";
import YoutubeView from "./YoutubeView";

export default function ArtistInfo({ artistId }: { artistId: string }) {
  const artistApi = new Artist();
  const { data, isLoading, error } = useSWR(`/api/artist/${artistId}`, () =>
    artistApi.getArtistInfo(artistId)
  );

  const navCategory = ["콘서트", "앨범", "팬명록"];

  const [navState, setNavState] = useState(navCategory[0]);

  const handleClick = (e: MouseEvent<HTMLLIElement>) =>
    setNavState(e.currentTarget.innerText);

  const artist: ArtistData = data && data.data;
  console.log(artist);
  return (
    <section>
      {isLoading && <p>Loading..</p>}
      {error && <p>Error!!</p>}
      {artist && (
        <>
          <div className="flex justify-around">
            <article>
              <div className="flex items-center gap-2">
                <Title>{artist.korName}</Title>
                {artist.enName && <p>{artist.enName}</p>}
              </div>
            </article>
            <Image
              priority
              className="rounded-md"
              src={artist.profile}
              alt={artist.korName}
              width={400}
              height={550}
            />
          </div>
          <Navbar
            navState={navState}
            category={navCategory}
            handleClick={handleClick}
          />
          <ArtistConsert artist={artist} />
          <YoutubeView artistName={artist.korName} />
        </>
      )}
    </section>
  );
}
