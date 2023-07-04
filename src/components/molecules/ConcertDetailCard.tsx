import { ConcertData } from "@/types/_type";
import ArtistRowItem from "./ArtistRowItem";

const ConcertDetailCard = ({ concertData }: { concertData: ConcertData }) => {
  const { _id, title, date, place, cast, link } = concertData;

  return (
    <div className="m-4">
      <div className="flex flex-col border-b p-4">
        <h3 className="text-2xl text-left font-extrabold">{title}</h3>
        <span className="text-gray-400 font-bold">{date}</span>
      </div>
      <div className="border-b p-4">
        <h2 className="text-xl font-bold mb-4">Location</h2>
        <span className="text-gray-400">{place}</span>
      </div>
      {cast && cast.length !== 0 && (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Line up</h2>
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
