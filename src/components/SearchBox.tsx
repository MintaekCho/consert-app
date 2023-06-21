import { SetStateAction } from "react";
import SearchBar from "./common/SearchBar";

const SearchBox = ({
  setKeyword,
}: {
  setKeyword: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  return (
    <div className="h-64 border-b-2 border-slate-150 mb-16 flex items-center justify-center">
      <SearchBar setKeyword={setKeyword} />
    </div>
  );
};

export default SearchBox;
