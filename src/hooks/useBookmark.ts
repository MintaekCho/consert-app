import { deleteApi, getApi, postApi } from "@/service/api/api";
import { ArtistData } from "@/types/_type";
import { useSession } from "next-auth/react";
import useSWR from "swr";

async function getUserBookmark(userId: string) {
  return await getApi(`/artist/bookmark/${userId}`);
}

async function getArtists() {
  return await getApi(`/artist?page=1&size&10`);
}

export default function useBookmark() {
  const { data: session } = useSession();

  const {
    data: bookmarks,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/artist/bookmark/${session?.user.id}`);

  const setBookmark = async (
    userId: string,
    artist: ArtistData,
    isBookmark: boolean
  ) => {
    const newBookmarks = bookmarks?.data?.filter(
      (b: ArtistData) => b !== artist
    );
    mutate(getUserBookmark(userId), {
      optimisticData: { data: newBookmarks },
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });

    if (isBookmark) {
      console.log(1);
      await deleteApi(`/artist/bookmark/${userId}/${artist._id}`);
    } else {
      console.log(2);
      await postApi(`/artist/bookmark/${userId}/${artist._id}`, {
        body: { userId: userId, artistId: artist._id },
      });
    }
  };
  return { bookmarks, isLoading, error, setBookmark };
}
