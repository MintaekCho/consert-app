import { ConcertData } from "@/types/_type";
import ConcertDetailCard from "../molecules/ConcertDetailCard";
import Tabbar from "../molecules/Tabbar";
import { useTab } from "@/hooks/useTab";
import ConsertMap from "../molecules/ConsertMap";

const ConcertTabbar = ({ concertData }: { concertData: ConcertData }) => {
  const tabList = ["공연", "장소"];
  const { curIndex, curItem, changeItem } = useTab({ init: 0, tabList });

  return (
    <div className="sm:w-2/4 sm:mr-8 bg-black w-full z-10 rounded-lg">
      <Tabbar tabItems={tabList} curIndex={curIndex} changeItem={changeItem} />
      {curItem === "공연" && (
        <>
          <ConcertDetailCard concertData={concertData} />
        </>
      )}
      {curItem === "장소" && (
        <>
          <ConsertMap place={concertData.place} />
        </>
      )}
    </div>
  );
};

export default ConcertTabbar;
