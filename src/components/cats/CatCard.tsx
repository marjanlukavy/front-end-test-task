import React from "react";
import { CatBreed } from "../../services/catsService";

interface CatCardProps {
  breed: CatBreed;
}

export const CatCard: React.FC<CatCardProps> = ({ breed }) => {
  return (
    <div className="group flex flex-col h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl hover:shadow-lg transition-shadow duration-200">
      <div className="p-4 md:p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {breed.name}
        </h3>
        <span className="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-400">
          Origin: {breed.origin}
        </span>
        <p className="mt-3 text-gray-500 dark:text-gray-400 line-clamp-3">
          {breed.description}
        </p>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-gray-700 dark:text-gray-300">
            <span>Adaptability:</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < breed.adaptability
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-gray-700 dark:text-gray-300">
            <span>Affection Level:</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < breed.affection_level
                      ? "text-red-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-gray-700 dark:text-gray-300">
            <span>Life Span:</span>
            <span className="font-medium">{breed.life_span} years</span>
          </div>
        </div>
      </div>
    </div>
  );
};
