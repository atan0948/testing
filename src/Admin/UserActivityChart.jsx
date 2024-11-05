import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const activityData = [
  { name: "Active Users", value: 300 },
  { name: "Inactive Users", value: 1200 },
];

const COLORS = ["#00C49F", "#FF8042"];

const UserActivityChart = () => (
  <ResponsiveContainer width='100%' height={300}>
    <PieChart>
      <Pie
        data={activityData}
        dataKey='value'
        nameKey='name'
        cx='50%'
        cy='50%'
        outerRadius={100}
        fill='#8884d8'
        label
      >
        {activityData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

export default UserActivityChart;
