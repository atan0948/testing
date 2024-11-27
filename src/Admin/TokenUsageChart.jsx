import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TokenUsageChart = () => {
  // Using static data instead of fetching from an API
  const [chartData, setChartData] = useState([
    { date: "2024-11-01", freeTokens: 120, premiumTokens: 80 },
    { date: "2024-11-02", freeTokens: 150, premiumTokens: 100 },
    { date: "2024-11-03", freeTokens: 180, premiumTokens: 120 },
    { date: "2024-11-04", freeTokens: 200, premiumTokens: 140 },
    { date: "2024-11-05", freeTokens: 220, premiumTokens: 160 },
    { date: "2024-11-06", freeTokens: 250, premiumTokens: 180 },
    { date: "2024-11-07", freeTokens: 300, premiumTokens: 200 },
  ]);
  const [error, setError] = useState(null);

  // You can remove the useEffect and fetching logic since we're using static data

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='freeTokens' fill='#8884d8' />
        <Bar dataKey='premiumTokens' fill='#82ca9d' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TokenUsageChart;
