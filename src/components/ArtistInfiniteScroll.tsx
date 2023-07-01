import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { ArtistData } from "@/types/_type";
import { useRef } from "react";
import Loading from "./common/Loading";
import Card from "./atoms/Card";

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
          <Card type="artist" data={artist} canBook={true} />
        </li>
      ))}
      {(isLoading || isNextPage) && <Loading ref={target} />}
    </ul>
  );
};

export default ArtistInfiniteScroll;
