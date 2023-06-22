import { useYoutubeApi } from "@/context/YoutubeApiContext";
import React from "react";
import useSWR from "swr";
import Title from "./common/Title";
import CarouselView from "./ui/CarouselView";
import YoutubeCard from "./YoutubeCard";

export type Thumbnails = {
  height: number;
  url: string;
  width: number;
};

export type YoutubeData = {
  etag: string;
  id: string;
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    thumbnails: {
      default: Thumbnails;
      high: Thumbnails;
      medium: Thumbnails;
    };
    title: string;
  };
};

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
      {isLoading && <p>Loading...</p>}
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
