import useSWRInfinite from "swr/infinite";
import axios from "axios";
import { useEffect } from "react";

interface InfiniteScrollParam<T> {
  apiUrl: string;
}

const useInfiniteScroll = <T>({ apiUrl }: InfiniteScrollParam<T>) => {
  const getKey = (page: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;

    if (page === 0) return `${apiUrl}?page=1&size=10`;
    return `${apiUrl}?page=${page + 1}&size=10`;
  };

  const fetcher = async (url: string) => {
    const res = await axios.get(url);
    return res.data;
  };

  const { data, setSize } = useSWRInfinite<T>(
    (page, previousPageData) => getKey(page, previousPageData),
    fetcher,
    { parallel: true }
  );
  const renderedData = data ? ([] as T[]).concat(...data) : [];

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setSize((prevSize) => prevSize + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setSize]);

  return renderedData;
};

export default useInfiniteScroll;
