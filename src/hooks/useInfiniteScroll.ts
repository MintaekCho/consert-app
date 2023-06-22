import useSWRInfinite from "swr/infinite";
import axios from "axios";
import { RefObject, useEffect } from "react";

interface InfiniteScrollParam<T> {
  apiUrl: string;
  target: RefObject<HTMLLIElement>;
}

interface ScrolledData<T> {
  isLoading: boolean;
  scrolledData: T[];
}

const useInfiniteScroll = <T>({
  apiUrl,
  target,
}: InfiniteScrollParam<T>): ScrolledData<T> => {
  const getKey = (page: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;

    if (page === 0) return `${apiUrl}?page=1&size=10`;
    return `${apiUrl}?page=${page + 1}&size=10`;
  };

  const fetcher = async (url: string) => {
    const res = await axios.get(url);
    return res.data;
  };

  const { data, isLoading, setSize } = useSWRInfinite<T>(
    (page, previousPageData) => getKey(page, previousPageData),
    fetcher,
    { parallel: true }
  );
  const scrolledData = data ? ([] as T[]).concat(...data) : [];

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    if (target.current) {
      //target.current가 null로 나옴.
      observer = new IntersectionObserver((entries) => {
        const targetEntry = entries[0];
        if (targetEntry.isIntersecting) {
          //타겟 요소와 루트 요소가 교차하면 다음페이지가 나온다.
          setSize((prevSize) => prevSize + 1);
        }
      }, options);
      observer.observe(target.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [setSize, target]);

  return { isLoading, scrolledData };
};

export default useInfiniteScroll;
