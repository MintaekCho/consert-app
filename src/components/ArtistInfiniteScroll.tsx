import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { ArtistData } from "@/types/_type";
import ArtistWrap from "./ArtistWrap";

const ArtistInfiniteScroll = () => {
  const artists = useInfiniteScroll<ArtistData>({ apiUrl: "/api/artist" });
  console.log(artists);

  return (
    <ArtistWrap artists={artists} />
  );
};

export default ArtistInfiniteScroll;
