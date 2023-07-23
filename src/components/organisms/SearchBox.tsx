import SearchBar from "../molecules/SearchBar";

const SearchBox = ({
  setKeyword,
  placeholder,
}: {
  setKeyword: React.Dispatch<React.SetStateAction<string | null>>;
  placeholder: string;
}) => {
  return (
    <div className="h-36 border-b-2 border-slate-150 mb-8 flex items-center justify-center">
      <SearchBar setKeyword={setKeyword} placeholder={placeholder} />
    </div>
  );
};

export default SearchBox;
