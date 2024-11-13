import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"; // Sidebar component
import DashMetrics from "./DashMetrics"; // Dashboard metrics component
import UserGrowthChart from "./UserGrowthChart"; // Chart showing user growth
import UserActivityChart from "./UserActivityChart"; // Chart showing user activity
import ActivityHeatmapChart from "./ActivityHeatmapChart"; // Activity heatmap chart

// Container styles for dark mode
const containerStyle = (isDarkMode) => ({
  display: "flex",
  height: "100vh",
  width: "100vw",
  margin: "0",
  backgroundColor: isDarkMode ? "#333" : "#f8f9fa",
});

// Main content style
const mainStyle = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

// Content area style based on dark mode
const contentStyle = (isDarkMode) => ({
  flex: 1,
  backgroundColor: isDarkMode ? "#444" : "white",
  padding: "20px",
  overflow: "auto",
  color: isDarkMode ? "#fff" : "#000",
});

// Grid layout for the charts
const chartContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

function AdminDash({ isDarkMode, toggleMode }) {
  // State for holding user metrics and chart data
  const [userCount, setUserCount] = useState(null); // For user count
  const [totalViews, setTotalViews] = useState("2,300"); // Placeholder value
  const [activeUsers, setActiveUsers] = useState("300"); // Placeholder value
  const [newSignUps, setNewSignUps] = useState("50"); // Placeholder value
  const [totalFeedback, setTotalFeedback] = useState("150"); // Placeholder value

  const [loading, setLoading] = useState(true); // State for loading indicator

  // Fetch user count on component mount
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user-count-details?days=30"
        ); // Ensure correct API endpoint
        console.log(response.data); // Debug log to inspect response

        if (response.data && response.data.totalUserCount) {
          setUserCount(response.data.totalUserCount); // Set the user count if data is correct
        } else {
          setUserCount(0); // If no valid data, set to 0
        }
      } catch (err) {
        console.error(err); // Log any errors to the console
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserCount();
  }, []); // Empty dependency array to run only once

  return (
    <div style={containerStyle(isDarkMode)}>
      {/* Sidebar Component */}
      <Sidebar isDarkMode={isDarkMode} toggleMode={toggleMode} />

      <div style={mainStyle}>
        <div style={contentStyle(isDarkMode)}>
          <h2>Main Content Area</h2>

          {/* DashMetrics Component */}
          <DashMetrics
            userCount={loading ? "Loading..." : userCount || "Data unavailable"} // Pass loading state and userCount
            totalViews={totalViews}
            activeUsers={activeUsers}
            newSignUps={newSignUps}
            totalFeedback={totalFeedback}
            loading={loading}
          />

          <h3>User Insights</h3>

          {/* Chart Layout */}
          <div style={chartContainerStyle}>
            <div>
              <h4>User Growth Over Time</h4>
              <UserGrowthChart />
            </div>
            <div>
              <h4>Active vs Inactive Users</h4>
              <UserActivityChart />
            </div>
            <div style={{ marginTop: "20px" }}>
              <h4>Daily Activity Heatmap</h4>
              <ActivityHeatmapChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
