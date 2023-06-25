import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import ArtistWrap from "./ArtistWrap";
import { ArtistData } from "./organisms/ArtistList";

const ArtistInfiniteScroll = () => {
  const artists = useInfiniteScroll<ArtistData>({ apiUrl: "/api/artist" });
  console.log(artists);

  return (
    <ArtistWrap artists={artists} />
  );
};

export default ArtistInfiniteScroll;
