import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { ArtistData } from "@/types/_type";
import ArtistWrap from "./ArtistWrap";
import { useRef } from "react";
import Loading from "./common/Loading";
import ArtistCard from "./molecules/ArtistCard";

const ArtistInfiniteScroll = () => {
  const target = useRef<HTMLDivElement>(null);

  const { isLoading, scrolledData, isNextPage } = useInfiniteScroll<ArtistData>(
    {
      apiUrl: "/api/artist",
      target,
    }
  );

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {scrolledData?.map((artist) => (
        <li key={artist._id}>
          <ArtistCard artist={artist} />
        </li>
      ))}
      {(isLoading || isNextPage) && <Loading ref={target} />}
    </ul>
  );
};

export default ArtistInfiniteScroll;
