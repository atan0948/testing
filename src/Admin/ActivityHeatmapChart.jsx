import React from "react";
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

const activityData = [
  { day: "Monday", activity: 400 },
  { day: "Tuesday", activity: 600 },
  { day: "Wednesday", activity: 300 },
  { day: "Thursday", activity: 500 },
  { day: "Friday", activity: 700 },
  { day: "Saturday", activity: 200 },
  { day: "Sunday", activity: 100 },
];

const ActivityHeatmapChart = () => (
  <ResponsiveContainer width='100%' height={300}>
    <BarChart
      data={activityData}
      margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='day' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey='activity' fill='#82ca9d' />
    </BarChart>
  </ResponsiveContainer>
);

export default ActivityHeatmapChart;
