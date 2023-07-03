"use client";
import { ArtistData, BookmarkData } from "@/types/_type";
import { useSession } from "next-auth/react";
import React from "react";
import ArtistCard from "../molecules/ArtistCard";
import useSWR from "swr";
import Artist from "@/service/artist/Artist";
import Link from "next/link";
import Loading from "../common/Loading";

export default function MyChoice() {
  const { data: session } = useSession();
  const artistApi = new Artist();

  const { isLoading, error, data} = useSWR(
    `/api/artist/bookmark/${session?.user.id}`,
    () => artistApi.getUserBookmark(session?.user.id as string)
  );

  const bookmarks: ArtistData[] = data?.data;
  return (
    <section className="w-full my-8">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">📕My-Choice</h2>
      {isLoading && <Loading />}
      {
        session ? (
          bookmarks?.length === 0 ? (
            <div className="flex flex-col gap-2 justify-center items-center p-8 mt-20">
              <p className="text-md md:text-lg lg:text-xl xl:text-2xl font-bold">북마크를 추가해보세요😆</p>
              <Link
                className="text-xs md:text-sm lg:text-md xl:text-xl font-bold px-4 py-2 rounded-xl bg-purple-600 hover:opacity-95"
                href={"/artist"}
              >
                Go
              </Link>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {bookmarks?.map((bookmark) => (
                <li key={bookmark._id}>
                  <ArtistCard artist={bookmark} />
                </li>
              ))}
            </ul>
          )
        )
        :
        <div className="flex flex-col gap-2 justify-center items-center p-8 mt-20">
          <p className="text-2xl font-bold">로그인하고 북마크를 추가해보세요😆</p>
        </div>

      }
      
    </section>
  );
}
