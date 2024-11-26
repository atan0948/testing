import React, { useState, useEffect } from "react";
import axios from "axios";
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

const UserGrowthChart = () => {
  // State to hold the chart data and error message
  const [chartData, setChartData] = useState([]); // Stores formatted chart data
  const [error, setError] = useState(null); // Stores error message if any occurs

  // useEffect to fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user growth data from the API
        const response = await axios.get(
          "http://172.22.30.136:8000/api/user-growth-per-month?days=90"
        );
        // Extract the monthly user counts from the API response
        const monthlyUserCounts = response.data.monthlyUserCounts || [];
        // Format the data to match the structure required by recharts
        const formattedData = monthlyUserCounts.map((item) => ({
          month: item.month, // Month of the data point
          users: item.user_count, // User count for that month
        }));
        // Update the state with the formatted data
        setChartData(formattedData);
      } catch (err) {
        // Handle any error during the data fetching
        console.error("Error fetching chart data:", err.message);
        setError("Failed to load chart data."); // Display an error message if fetching fails
      }
    };

    fetchData(); // Call the fetchData function on mount
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // If there is an error, display an error message
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  // Return the line chart component, wrapped in a responsive container
  return (
    <ResponsiveContainer width='100%' height={300}>
      {" "}
      {/* Responsive chart container */}
      <LineChart
        data={chartData} // Pass the formatted chart data
        margin={{ top: 20, right: 20, left: 20, bottom: 5 }} // Margin for chart layout
      >
        {/* Grid lines for the chart */}
        <CartesianGrid strokeDasharray='3 3' />
        {/* X-axis, showing the month names */}
        <XAxis dataKey='month' />
        {/* Y-axis, displaying the number of users */}
        <YAxis />
        {/* Tooltip that appears when hovering over a data point */}
        <Tooltip />
        {/* Legend to identify the line data */}
        <Legend />
        {/* Line representing the user growth over the months */}
        <Line
          type='monotone' // Smooth line
          dataKey='users' // Data key for the user count
          stroke='#8884d8' // Line color
          activeDot={{ r: 8 }} // Active dot (highlighted) when hovering over the line
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UserGrowthChart;
