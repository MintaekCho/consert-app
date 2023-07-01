import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { ConcertData } from "@/types/_type";
import { useRef } from "react";
import Loading from "./common/Loading";
import Card from "@/components/atoms/Card";

const ConcertInfiniteScroll = () => {
  const target = useRef<HTMLDivElement>(null);

  const { isLoading, scrolledData, isNextPage } =
    useInfiniteScroll<ConcertData>({
      apiUrl: "/api/consert",
      target,
    });

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {scrolledData?.map((concert) => (
        <li key={concert._id}>
          <Card type="concert" data={concert} />
        </li>
      ))}
      {(isLoading || isNextPage) && <Loading ref={target} />}
    </ul>
  );
};

export default ConcertInfiniteScroll;
