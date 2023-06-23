import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import ArtistCard from "./molecules/ArtistCard";
import { ArtistData } from "./organisms/ArtistList";

const ArtistInfiniteScroll = () => {
  const artists = useInfiniteScroll<ArtistData>({ apiUrl: "/api/artist" });
  console.log(artists);

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {artists?.map((artist) => (
        <li key={artist._id}>
          <ArtistCard artist={artist} />
        </li>
      ))}
    </ul>
  );
};

export default ArtistInfiniteScroll;
