"use client";
import { ArtistData, UserData } from "@/types/_type";
import React from "react";
import ArtistCard from "./molecules/ArtistCard";
import useSWR from "swr";
import UserService from "@/service/user/User";
import { useSession } from "next-auth/react";

export default function ArtistWrap({ artists }: { artists: ArtistData[] }) {
  const { data: session } = useSession();
  const userApi = new UserService();

  const { data } = useSWR(
    `/api/user/${session?.user.email}`,
    () => session && userApi.getUser(session?.user.email)
  );

  const user: UserData = data?.data;
  console.log(user);

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {artists?.map((artist, i) => {
        return (
          <li key={artist._id}>
            <ArtistCard artist={artist} />
          </li>
        );
      })}
    </ul>
  );
}
