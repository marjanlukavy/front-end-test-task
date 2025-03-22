import React from "react";
import { CatBreed } from "../../services/catsService";

interface CatFiltersProps {
  sortField: keyof CatBreed;
  setSortField: (field: keyof CatBreed) => void;
  sortDirection: "asc" | "desc";
  setSortDirection: (direction: "asc" | "desc") => void;
  originFilter: string;
  setOriginFilter: (origin: string) => void;
  adaptabilityFilter: string;
  setAdaptabilityFilter: (adaptability: string) => void;
}

export const CatFilters: React.FC<CatFiltersProps> = ({
  sortDirection,
  setSortDirection,
  originFilter,
  setOriginFilter,
  adaptabilityFilter,
  setAdaptabilityFilter,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col gap-4">
        {/* Sort and Filter Dropdowns */}
        <div className="flex flex-wrap gap-4">
          {/* Sort Direction Toggle */}
          <div className="inline-flex">
            <button
              className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-l-lg ${
                sortDirection === "asc"
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              } border border-gray-200 dark:border-gray-600`}
              onClick={() => setSortDirection("asc")}
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
              Ascending
            </button>
            <button
              className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-r-lg ${
                sortDirection === "desc"
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              } border border-gray-200 dark:border-gray-600`}
              onClick={() => setSortDirection("desc")}
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              Descending
            </button>
          </div>

          {/* Search and Filter Inputs */}
          <div className="flex-1 min-w-[15rem]">
            <div className="relative">
              <input
                type="text"
                className="py-3 px-4 pl-11 block w-full border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Search by origin..."
                value={originFilter}
                onChange={(e) => setOriginFilter(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
                <svg
                  className="h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-[15rem]">
            <select
              className="py-3 px-4 block w-full border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:ring-blue-500"
              value={adaptabilityFilter}
              onChange={(e) => setAdaptabilityFilter(e.target.value)}
            >
              <option value="">All Adaptability Levels</option>
              {[1, 2, 3, 4, 5].map((level) => (
                <option key={level} value={level}>
                  Adaptability Level {level}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
