import ArtistInfo from "@/components/ArtistInfo";
import YoutubeView from "@/components/YoutubeView";
import React from "react";

type Props = {
  slug: string;
};

export default function ArtistDetailsPage({ params }: { params: Props }) {
  const artistId = params.slug;
  return (
    <div className="mt-8">
      <ArtistInfo artistId={artistId} />
    </div>
  );
}
