import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface PaginationProps {
  page: number;
  lastPage: number | null;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
  page,
  lastPage,
  setPage,
}: PaginationProps) {
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
      {lastPage ? (
        Array(lastPage)
          .fill(null)
          .map((_, i) => {
            return (
              <button
                key={i}
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-purple-700 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  setPage(i + 1);
                }}
              >
                {i + 1}
              </button>
            );
          })
      ) : (
        <button
          aria-current="page"
          className="relative z-10 inline-flex items-center bg-purple-700 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {page}
        </button>
      )}
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
