import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import ArtistCard from "./molecules/ArtistCard";
import { ArtistData } from "./organisms/ArtistList";
import { RefObject, useRef } from "react";
import Loading from "./common/Loading";

const ArtistInfiniteScroll = () => {
  const target = useRef<HTMLLIElement | null>(null);
  const { isLoading, scrolledData } = useInfiniteScroll<ArtistData>({
    apiUrl: "/api/artist",
    target: target as RefObject<HTMLLIElement>,
  });
  console.log(target, "넘겨줌: " + target.current?.outerText);

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {scrolledData?.map((artist, index) => (
        <li
          key={artist._id}
          ref={index === scrolledData.length - 1 ? target : null}
        >
          <ArtistCard artist={artist} />
        </li>
      ))}
    </ul>
  );
};

export default ArtistInfiniteScroll;
