"use client";
import { ArtistData } from "@/types/_type";
import { useSession } from "next-auth/react";
import React from "react";
import useSWR from "swr";
import Artist from "@/service/artist/Artist";
import Link from "next/link";
import Loading from "../common/Loading";
import Card from "../atoms/Card";
import Title from "../atoms/Title";
import { BsBookmarkHeartFill } from "react-icons/bs";
import GuideTxt from "../atoms/GuideTxt";

export default function MyChoice() {
  const { data: session } = useSession();
  const artistApi = new Artist();

  const { isLoading, error, data } = useSWR(
    `/api/artist/bookmark/${session?.user.id}`,
    () => artistApi.getUserBookmark(session?.user.id as string)
  );

  const bookmarks: ArtistData[] = data?.data;
  return (
    <section className="w-full my-8">
      <Title icon={<BsBookmarkHeartFill />}>My-Choice</Title>
      {isLoading && <Loading />}
      {session ? (
        bookmarks?.length === 0 ? (
          <div className="flex flex-col gap-2 justify-center items-center p-8 mt-20">
            <GuideTxt>북마크를 추가해보세요.</GuideTxt>
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
                <Card type={"artist"} canBook={true} data={bookmark} />
              </li>
            ))}
          </ul>
        )
      ) : (
        <div className="flex flex-col gap-2 justify-center items-center p-8 mt-20">
          <GuideTxt>로그인하고 북마크를 추가해보세요.</GuideTxt>
        </div>
      )}
    </section>
  );
}
