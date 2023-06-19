"use client";
import { useYoutubeApi } from "@/context/YoutubeApiContext";
import React from "react";
import useSWR from "swr";
import { BlockingData } from "swr/_internal";
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

export default function YoutubeView({artistName}: {artistName: string}) {
  const { youtube } = useYoutubeApi();

  const {
    data: videos,
    error,
    isLoading,
  }: { data: YoutubeData[]; error: any; isLoading: any } = useSWR(
    "https://www.googleapis.com/youtube/v3/search",
    () => youtube.search(artistName)
  );
  console.log(videos);

  return (
    <section>
      {isLoading && <p>Loading...</p>}
      {error && <p>error</p>}
      {videos &&
      <CarouselView>
         {videos.map((video) => <YoutubeCard key={video.id} video={video} />)}
      </CarouselView>
      }
    </section>
  );
}
