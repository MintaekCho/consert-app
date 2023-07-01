import Concert from "@/service/consert/Consert";
import Loading from "../common/Loading";
import useSWR from "swr";
import Title from "../atoms/Title";
import Image from "next/image";
import ConcertTabbar from "../organisms/ConcertTabbar";

const ConcertInfo = ({ concertId }: { concertId: string }) => {
  const concertApi = new Concert();
  const fetcher = async () => {
    const res = await concertApi.getConsertDetails(concertId);
    return res.data;
  };
  const { data, error } = useSWR(
    `/api/consert/details?consertId=${concertId}`,
    fetcher
  );

  return (
    <section>
      {error && <p>Error</p>}
      {data ? (
        <>
          <article className="m-8">
            <Title>{data?.title}</Title>
            <div className="flex w-full justify-around">
              <ConcertTabbar concertData={data} />
              <div className="w-2/4">
                <figure className="relative w-full h-screen max-w-md">
                  <Image
                    src={data?.image}
                    alt={data?.title}
                    fill={true}
                    className="sticky top-0 object-contain object-top"
                  />
                </figure>
              </div>
            </div>
          </article>
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default ConcertInfo;