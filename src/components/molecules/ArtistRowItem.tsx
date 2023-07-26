import useSWR from "swr";
import Artist from "@/service/artist/Artist";
import RowItem from "../atoms/RowItem";
import Link from "next/link";
import { getApi } from "@/service/api/api";

const ArtistRowItem = ({ artistName }: { artistName: string }) => {
  const { data, error, isLoading } = useSWR(
    `api/artist/cast/${artistName}`,
    () => {
      return getApi('/artist/cast', {
        params: {
          name: artistName
        }
      })
    }
  );

  const artistProfile = data?.result;

  return (
    <Link href={`/artist/${artistProfile ? artistProfile._id : ''}`}>
      <RowItem label={artistName} img={artistProfile?.profile} />
    </Link>
  );
};

export default ArtistRowItem;
