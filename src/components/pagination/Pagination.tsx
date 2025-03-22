import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const visiblePages = [];

    if (currentPage > 3) {
      visiblePages.push(1);
      if (currentPage > 4) visiblePages.push("...");
    }

    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      visiblePages.push(i);
    }

    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) visiblePages.push("...");
      visiblePages.push(totalPages);
    }

    return visiblePages.map((page, index) => {
      if (page === "...") {
        return (
          <span
            key={`ellipsis-${index}`}
            className="px-3 py-2 text-gray-600 dark:text-gray-400"
          >
            ...
          </span>
        );
      }

      return (
        <button
          key={page}
          onClick={() => onPageChange(page as number)}
          className={`px-3 py-2 rounded-lg cursor-pointer ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-lg cursor-pointer ${
          currentPage === 1
            ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg cursor-pointer ${
          currentPage === totalPages
            ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        Next
      </button>
    </div>
  );
};
