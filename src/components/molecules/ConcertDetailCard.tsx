import { ConcertData } from "@/types/_type";
import ArtistRowItem from "./ArtistRowItem";
import Subtitle from "../atoms/Subtitle";
import SubContent from "../atoms/SubContent";

const ConcertDetailCard = ({ concertData }: { concertData: ConcertData }) => {
  const { _id, title, startDate, endDate, place, cast, link, grade } =
    concertData;

  return (
    <div className="m-4">
      <div className="flex flex-col border-b p-4">
        <Subtitle type="large">{title}</Subtitle>
        <SubContent>{`${startDate} ~ ${endDate}`}</SubContent>
        {grade && <SubContent>{`관람등급 : ${grade}`}</SubContent>}
      </div>
      <div className="border-b p-4">
        <Subtitle>Location</Subtitle>
        <SubContent>{place}</SubContent>
      </div>
      {cast && cast.length !== 0 && (
        <div className="p-4">
          <Subtitle>Line up</Subtitle>
          <ul className="grid grid-cols-2 gap-4">
            {cast.map((artist, i) => {
              return (
                <ArtistRowItem key={`${artist} ${_id}`} artistName={artist} />
              );
            })}
          </ul>
        </div>
      )}
      {link && (
        <div className="flex justify-center m-4">
          <a
            href={link}
            target={"_blank"}
            className="w-full bg-purple-600 hover:bg-purple-500 text-center text-white font-bold py-2 px-4 rounded"
          >
            예매하기
          </a>
        </div>
      )}
    </div>
  );
};

export default ConcertDetailCard;
