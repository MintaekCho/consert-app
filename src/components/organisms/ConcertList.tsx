import { ConcertData, SearchProps } from "@/types/_type";
import { useEffect } from "react";
import useSWR, { mutate } from "swr";
// import ConcertCard from "../molecules/ConcertCard";
import Card from "../atoms/Card";
import Consert from "@/service/consert/Consert";

const ConcertList = ({ keyword }: SearchProps) => {
  const consertApi = new Consert();
  const { data, isLoading, error } = useSWR(
    `/api/consert/proceeding/${keyword}`,
    () => {
      if (keyword) return consertApi.procConsert(keyword);
    },
    {
      revalidateOnMount: true,
    }
  );

  const concerts: ConcertData[] = data && data.data;

  useEffect(() => {
    mutate(`api/consert/proceeding/${keyword}`);
  }, [keyword]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  return (
    <section className=" mt-8">
      {keyword && concerts && concerts.length ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {concerts.map((concert) => (
            <li key={concert._id}>
              <Card type="concert" data={concert} />
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p className="text-md lg:text-xl xl:text-2xl p-4 font-bold text-white">
            찾으시는 콘서트 정보가 없어요.
          </p>
        </div>
      )}
    </section>
  );
};

export default ConcertList;
