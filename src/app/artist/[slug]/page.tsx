import YoutubeView from "@/components/YoutubeView";
import React from "react";

type Props = {
  slug: string;
};

export default function ArtistDetailsPage({ params }: { params: Props }) {
  const artistName = params.slug;
  return (
    <div>
        <p>{artistName}</p>
      {/* <YoutubeView artistName={artistName}/> */}
    </div>
  );
}
