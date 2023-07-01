import { Dispatch, SetStateAction } from "react";

interface TabProps {
  tabItems: string[];
  curIndex: number;
  changeItem: Dispatch<SetStateAction<number>>;
}
const Tabbar = ({ tabItems, curIndex, changeItem }: TabProps) => {
  return (
    <div className="font-medium text-center border-b border-gray-200">
      <ul className="flex gap-6 text-lg font-bold">
        {tabItems.map((tabItem, i) => {
          return (
            <li
              className={`cursor-pointer mx-2 text-white ${
                curIndex === i
                  ? "border-b-2 border-white border-red opacity-100 border-1"
                  : "opacity-70"
              }`}
              key={i}
              onClick={() => {
                changeItem(i);
              }}
            >
              <a
                href="#"
                className={`inline-block p-4 border-transparent hover:opacity-75 hover:border-opacity-75hover:border-solid hover:border-white ${
                  curIndex === i ? "" : "hover:border-b-2"
                }
                }`}
              >
                {tabItem}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tabbar;
