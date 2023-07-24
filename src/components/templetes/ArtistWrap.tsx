"use client";
import { ArtistData, UserData } from "@/types/_type";
import React from "react";
import useSWR from "swr";
import UserService from "@/service/user/User";
import { useSession } from "next-auth/react";
import Card from "../atoms/Card";

export default function ArtistWrap({ artists }: { artists: ArtistData[] }) {
  const { data: session } = useSession();
  const userApi = new UserService();

  const { data } = useSWR(
    `/api/user/${session?.user.email}`,
    () => session && userApi.getUser(session?.user.email as string)
  );

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {artists?.map((artist, i) => {
        return (
          <li key={artist._id}>
            <Card type="artist" data={artist} canBook={true} />
          </li>
        );
      })}
    </ul>
  );
}
