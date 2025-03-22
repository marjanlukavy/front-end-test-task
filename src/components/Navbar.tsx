import React from "react";
import { ThemeToggle } from "./theme/ThemeToggle";
import { Link } from "react-router";

export const Navbar: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 dark:text-blue-400"
        >
          Cat Breeds App
        </Link>
        <div className="w-48">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};
