import React from "react";
import { ResponsiveContainer } from "recharts";

interface ChartCardProps {
  title: string;
  children: React.ReactElement;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        {title}
      </h2>
      <div className="h-[300px]">
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </div>
  );
};
