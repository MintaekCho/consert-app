import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export interface PaginationProps {
  page: number;
  lastPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
  page,
  lastPage,
  setPage,
}: PaginationProps) {
  const maxPage = Math.min(5, lastPage);
  const startPage = Math.max(1, page - Math.floor(maxPage / 2));
  const endPage = Math.min(startPage + maxPage - 1, lastPage);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
  return (
    <div
      className="flex items-center justify-center space-x-2 mt-16"
      aria-label="Pagination"
    >
      <button
        className={`${page === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        <span className="sr-only">Previous</span>
        <BsChevronLeft aria-hidden="true" />
      </button>
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`mx-1 px-3 py-1 rounded-lg hover:opacity-50 ${
            page === pageNumber ? "bg-purple-700 text-white" : "text-white"
          }`}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className={`${
          page === lastPage ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={() => {
          setPage(page + 1);
        }}
        disabled={page === lastPage}
      >
        <span className="sr-only">Next</span>
        <BsChevronRight aria-hidden="true" />
      </button>
    </div>
  );
}
