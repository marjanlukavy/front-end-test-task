import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { ChartCard } from "./ChartCard";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

interface ChartData {
  name: string;
  value: number;
}

interface CatChartsProps {
  chartData: {
    adaptabilityData: ChartData[];
    affectionData: ChartData[];
    originData: ChartData[];
    indoorData: ChartData[];
    lapData: ChartData[];
    lifeSpanData: { name: string; years: number }[];
  };
}

export const CatCharts: React.FC<CatChartsProps> = ({ chartData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ChartCard title="Adaptability Distribution">
        <BarChart data={chartData.adaptabilityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#0088FE" />
        </BarChart>
      </ChartCard>

      <ChartCard title="Affection Levels">
        <BarChart data={chartData.affectionData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#00C49F" />
        </BarChart>
      </ChartCard>

      <ChartCard title="Top Origins">
        <PieChart>
          <Pie
            data={chartData.originData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {chartData.originData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ChartCard>

      <ChartCard title="Indoor vs Outdoor Preference">
        <PieChart>
          <Pie
            data={chartData.indoorData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {chartData.indoorData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ChartCard>

      <ChartCard title="Lap Cat Distribution">
        <PieChart>
          <Pie
            data={chartData.lapData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {chartData.lapData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ChartCard>

      <ChartCard title="Life Span Distribution">
        <LineChart data={chartData.lifeSpanData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="years" stroke="#8884d8" />
        </LineChart>
      </ChartCard>
    </div>
  );
};
