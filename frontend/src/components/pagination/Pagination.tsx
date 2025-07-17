import { FC } from "react";

const Pagination: FC<{
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPrevious, onNext, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="cursor-pointer px-3 py-2 rounded-md border bg-surface text-primary-text border-border hover:bg-primary-text hover:text-white disabled:opacity-40"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`cursor-pointer w-9 h-9 rounded-full border ${
            page === currentPage
              ? "bg-primary-text text-white border-primary-text"
              : "bg-surface text-primary-text border-border hover:bg-primary-text hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="cursor-pointer px-3 py-2 rounded-md border bg-surface text-primary-text border-border hover:bg-primary-text hover:text-white disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
