import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../store/store";
import { useGetBreedsQuery, type CatBreed } from "../services/catsService";
import { CatFilters } from "../components/filters/CatFilters";
import { CatCharts } from "../components/charts/CatCharts";
import { CatCard } from "../components/cats/CatCard";
import { Pagination } from "../components/pagination/Pagination";

const ITEMS_PER_PAGE = 9;

const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { data: breeds, isLoading, error } = useGetBreedsQuery();

  // Sorting state
  const [sortField, setSortField] = useState<keyof CatBreed>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filtering state
  const [originFilter, setOriginFilter] = useState("");
  const [adaptabilityFilter, setAdaptabilityFilter] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [isAuthenticated, navigate]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [originFilter, adaptabilityFilter, sortField, sortDirection]);

  // Filter and sort breeds
  const filteredAndSortedBreeds = useMemo(() => {
    if (!breeds) return [];

    return [...breeds]
      .filter((breed) => {
        const matchesOrigin =
          !originFilter ||
          breed.origin.toLowerCase().includes(originFilter.toLowerCase());
        const matchesAdaptability =
          !adaptabilityFilter ||
          breed.adaptability === parseInt(adaptabilityFilter);
        return matchesOrigin && matchesAdaptability;
      })
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        const modifier = sortDirection === "asc" ? 1 : -1;

        if (typeof aValue === "string" && typeof bValue === "string") {
          return aValue.localeCompare(bValue) * modifier;
        }
        return ((aValue as number) - (bValue as number)) * modifier;
      });
  }, [breeds, sortField, sortDirection, originFilter, adaptabilityFilter]);

  // Get current page items
  const currentBreeds = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedBreeds.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedBreeds, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredAndSortedBreeds.length / ITEMS_PER_PAGE);

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!breeds)
      return {
        adaptabilityData: [],
        affectionData: [],
        originData: [],
        indoorData: [],
        lapData: [],
        lifeSpanData: [],
      };

    const originCount = breeds.reduce((acc, breed) => {
      acc[breed.origin] = (acc[breed.origin] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const indoorCount = breeds.reduce((acc, breed) => {
      if (breed.indoor === 1) {
        acc.indoor = (acc.indoor || 0) + 1;
      } else {
        acc.outdoor = (acc.outdoor || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      adaptabilityData: breeds.map((breed) => ({
        name: breed.name,
        value: breed.adaptability,
      })),
      affectionData: breeds.map((breed) => ({
        name: breed.name,
        value: breed.affection_level,
      })),
      originData: Object.entries(originCount).map(([name, value]) => ({
        name,
        value,
      })),
      indoorData: [
        { name: "Indoor", value: indoorCount.indoor || 0 },
        { name: "Outdoor", value: indoorCount.outdoor || 0 },
      ],
      lapData: [
        { name: "Lap Cat", value: breeds.filter((b) => b.lap === 1).length },
        {
          name: "Not Lap Cat",
          value: breeds.filter((b) => b.lap === 0).length,
        },
      ],
      lifeSpanData: breeds.map((breed) => ({
        name: breed.name,
        years: parseInt(breed.life_span.split("-")[0]),
      })),
    };
  }, [breeds]);

  if (isLoading || error) {
    return (
      <div className="flex items-center justify-center h-screen">
        {isLoading ? (
          <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" />
        ) : (
          <div className="text-red-500">Error loading cats data</div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Cat Breeds Statistics</h1>

      <CatFilters
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        originFilter={originFilter}
        setOriginFilter={setOriginFilter}
        adaptabilityFilter={adaptabilityFilter}
        setAdaptabilityFilter={setAdaptabilityFilter}
      />

      {filteredAndSortedBreeds.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <svg
            className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No Matches Found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No cat breeds match your current filter criteria. Try adjusting your
            filters to see more results.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBreeds.map((breed) => (
              <CatCard key={breed.id} breed={breed} />
            ))}
          </div>
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
          <div className="mt-4 text-center text-gray-500 dark:text-gray-400">
            Showing {Math.min(currentBreeds.length, ITEMS_PER_PAGE)} of{" "}
            {filteredAndSortedBreeds.length} breeds
          </div>
        </>
      )}

      <CatCharts chartData={chartData} />
    </div>
  );
};

export default HomePage;
