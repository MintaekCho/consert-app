import useSWRInfinite from "swr/infinite";
import axios from "axios";
import { RefObject, useEffect } from "react";

interface InfiniteScrollParam<T> {
  apiUrl: string;
  target: RefObject<HTMLDivElement>;
}

interface ScrolledData<T> {
  isLoading: boolean;
  scrolledData: T[];
  isNextPage: boolean;
}

const useInfiniteScroll = <T>({
  apiUrl,
  target,
}: InfiniteScrollParam<T>): ScrolledData<T> => {
  const getKey = (page: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) {
      return null;
    }

    if (page === 0) return `${apiUrl}?page=1&size=12`;
    return `${apiUrl}?page=${page + 1}&size=12`;
  };

  const fetcher = async (url: string) => {
    const res = await axios.get(url);
    return res.data;
  };

  const { data, isLoading, setSize, mutate } = useSWRInfinite<T[]>(
    (page, previousPageData) => getKey(page, previousPageData),
    fetcher,
    { parallel: true}
  );
  const scrolledData = data ? ([] as T[]).concat(...data) : [];
  const isNextPage = data ? data && data[data.length - 1].length > 0 : false;

  useEffect(() => {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
    const currentTarget = target.current;

    const observer = new IntersectionObserver((entries) => {
      const lastEntry = entries[0];
      if (lastEntry && lastEntry.isIntersecting) {
        setSize((prevSize) => prevSize + 1);
      }
    }, options);
    target.current && observer.observe(target.current);

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [setSize, target]);

  return { isLoading, scrolledData, isNextPage };
};

export default useInfiniteScroll;
