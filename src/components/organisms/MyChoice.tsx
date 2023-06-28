"use client";
import { BookmarkData } from "@/types/_type";
import { useSession } from "next-auth/react";
import React, { useRef } from "react";
import ArtistCard from "../molecules/ArtistCard";
import useSWR from "swr";
import Artist from "@/service/artist/Artist";

export default function MyChoice() {
  const target = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const artistApi = new Artist();

  const { isLoading, error, data } = useSWR(
    `/api/artist/bookmark/${session?.user.id}`,
    () => artistApi.getUserBookmark(session?.user.id as string)
  );

  const bookmarks: BookmarkData[] = data?.data;
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">My-Choice</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {bookmarks?.map((bookmark) => (
          <li key={bookmark._id}>
            <ArtistCard artist={bookmark.artist} />
          </li>
        ))}
      </ul>
    </section>
  );
}
