import { useYoutubeApi } from "@/context/YoutubeApiContext";
import { YoutubeData } from "@/types/_type";
import React from "react";
import useSWR from "swr";
import Title from "../atoms/Title";
import Loading from "../common/Loading";
import YoutubeCard from "../molecules/YoutubeCard";
import CarouselView from "./CarouselView";

export default function YoutubeView({ artistName }: { artistName: string }) {
  const { youtube } = useYoutubeApi();
  const {
    data: videos,
    error,
    isLoading,
  }: { data: YoutubeData[]; error: any; isLoading: any } = useSWR(
    `https://www.googleapis.com/youtube/v3/search/${artistName}`,
    () => youtube.search(artistName),
    {
      refreshInterval: 1000 * 60 * 30,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <section className="mt-12">
      {isLoading && <Loading />}
      {error && <p>error</p>}
      <Title>🔥HotTube</Title>
      {videos && (
        <CarouselView type={"menual"}>
          {videos.map((video) => (
            <YoutubeCard key={video.id} video={video} />
          ))}
        </CarouselView>
      )}
    </section>
  );
}
