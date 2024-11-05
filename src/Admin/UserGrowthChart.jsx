import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const userData = [
  { month: "Aug", users: 230 },
  { month: "Sept", users: 620 },
  { month: "Oct", users: 900 },
  { month: "Nov", users: 1500 },
  // Add more data points as needed
];

const UserGrowthChart = () => (
  <ResponsiveContainer width='100%' height={300}>
    <LineChart
      data={userData}
      margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='month' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type='monotone'
        dataKey='users'
        stroke='#8884d8'
        activeDot={{ r: 8 }}
      />
    </LineChart>
  </ResponsiveContainer>
);

export default UserGrowthChart;
