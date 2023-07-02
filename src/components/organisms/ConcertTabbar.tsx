import { ConcertData } from "@/types/_type";
import ConcertDetailCard from "../molecules/ConcertDetailCard";
import Tabbar from "../molecules/Tabbar";
import { useTab } from "@/hooks/useTab";
import ArtistComments from "./ArtistComments";

const ConcertTabbar = ({ concertData }: { concertData: ConcertData }) => {
  const tabList = ["공연", "팬명록"];
  const { curIndex, curItem, changeItem } = useTab({ init: 0, tabList });

  return (
    <div className="w-2/4 mr-8">
      <Tabbar tabItems={tabList} curIndex={curIndex} changeItem={changeItem} />
      {curItem === "공연" && (
        <>
          <div>
            <h2 className="text-xl font-bold p-4">About</h2>
            <ConcertDetailCard concertData={concertData} />
          </div>
        </>
      )}
      {curItem === "팬명록" && (
        <>
          <div className="m-4">
            <h2 className="text-xl font-bold mb-4">Fans Comment</h2>
            <ArtistComments />
          </div>
        </>
      )}
    </div>
  );
};

export default ConcertTabbar;
