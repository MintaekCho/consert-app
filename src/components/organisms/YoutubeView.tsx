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
    () => youtube.search(`가수 ${artistName} 라이브`),
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
        <>
          <div className="hidden sm:block">
            <CarouselView type={"menual"}>
              {videos.map((video) => (
                <YoutubeCard key={video.id} video={video} />
              ))}
            </CarouselView>
          </div>

          <ul className="flex flex-col gap-2 sm:hidden">
            {videos.map((video) => (
              <li key={video.id}>
                <YoutubeCard video={video} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
