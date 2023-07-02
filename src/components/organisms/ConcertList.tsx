import { ConcertData, SearchProps } from "@/types/_type";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import ConcertCard from "../molecules/ConcertCard";
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
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {keyword && concerts ? (
          concerts.map((concert) => (
            <li key={concert._id}>
              <ConcertCard consert={concert} />
            </li>
          ))
        ) : (
          <div>
            <p>찾으시는 콘서트가 없어요.</p>
          </div>
        )}
      </ul>
    </section>
  );
};

export default ConcertList;
