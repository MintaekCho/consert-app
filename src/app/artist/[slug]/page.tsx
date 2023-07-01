import ArtistInfo from "@/components/templetes/ArtistInfo";
import { DetailDataProps } from "@/types/props";
import React from "react";

export default function ArtistDetailsPage({
  params,
}: {
  params: DetailDataProps;
}) {
  const artistId = params.slug;
  return (
    <div className="mt-8">
      <ArtistInfo artistId={artistId} />
    </div>
  );
}
