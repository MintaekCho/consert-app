import useSWR from "swr";
import Artist from "@/service/artist/Artist";
import RowItem from "../atoms/RowItem";

const ArtistRowItem = ({ artistName }: { artistName: string }) => {
  const artistApi = new Artist();
  const { data, error, isLoading } = useSWR(
    `api/artist/search/${artistName}`,
    () => {
      return artistApi.getSearchArtists({
        name: artistName,
        page: 1,
        size: 1,
      });
    }
  );

  const artistProfile = data?.data.findArtist[0];

  return <RowItem label={artistName} img={artistProfile?.profile} />;
};

export default ArtistRowItem;
