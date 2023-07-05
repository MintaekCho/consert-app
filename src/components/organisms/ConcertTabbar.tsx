import { ConcertData } from "@/types/_type";
import ConcertDetailCard from "../molecules/ConcertDetailCard";
import Tabbar from "../molecules/Tabbar";
import { useTab } from "@/hooks/useTab";

const ConcertTabbar = ({ concertData }: { concertData: ConcertData }) => {
  const tabList = ["공연"];
  const { curIndex, curItem, changeItem } = useTab({ init: 0, tabList });

  return (
    <div className="sm:w-2/4 sm:mr-8 bg-black w-full z-10 rounded-lg">
      <Tabbar tabItems={tabList} curIndex={curIndex} changeItem={changeItem} />
      {curItem === "공연" && (
        <>
          <div>
            <h2 className="text-xl font-bold p-4">About</h2>
            <ConcertDetailCard concertData={concertData} />
          </div>
        </>
      )}
    </div>
  );
};

export default ConcertTabbar;
