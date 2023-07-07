import Concert from "@/service/consert/Consert";
import Loading from "../common/Loading";
import useSWR from "swr";
import Title from "../atoms/Title";
import Image from "next/image";
import ConcertTabbar from "../organisms/ConcertTabbar";
import GuideTxt from "../atoms/guideTxt";

const ConcertInfo = ({ concertId }: { concertId: string }) => {
  const concertApi = new Concert();
  const fetcher = async () => {
    const res = await concertApi.getConsertDetails(concertId);
    return res.data;
  };
  const { data, isLoading, error } = useSWR(
    `/api/consert/details?consertId=${concertId}`,
    fetcher
  );

  if (error) {
    console.error(error);

    return (
      <GuideTxt>알 수 없는 에러가 발생했습니다. 다시 시도해주세요.</GuideTxt>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      {data ? (
        <>
          <article className="p-8">
            <Title>{data?.title}</Title>
            <div className="flex w-full flex-col-reverse sm:flex-row">
              <ConcertTabbar concertData={data} />
              <div className="sm:w-2/4 w-full sticky top-0">
                <figure
                  className="relative w-full h-screen sm:max-w-md"
                  style={{
                    height: `calc(70vh - 150px)`,
                  }}
                >
                  <Image
                    src={data?.image}
                    alt={data?.title}
                    fill={true}
                    className="object-contain object-top"
                  />
                </figure>
              </div>
            </div>
          </article>
        </>
      ) : (
        <div>
          <GuideTxt>해당 콘서트에 대한 데이터가 없어요.</GuideTxt>
        </div>
      )}
    </section>
  );
};

export default ConcertInfo;
