import { useState } from "react";

interface tabProps {
  init: number;
  tabList: string[];
}
export const useTab = ({ init, tabList }: tabProps) => {
  const [curIndex, setCurIndex] = useState(init);
  return {
    curIndex,
    curItem: tabList[curIndex],
    changeItem: setCurIndex,
  };
};
