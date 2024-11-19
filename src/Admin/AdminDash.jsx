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
  const [newSignUps, setNewSignUps] = useState("50"); // Placeholder value for daily sign-ups
  const [totalViews, setTotalViews] = useState("2,300"); // Placeholder value
  const [activeUsers, setActiveUsers] = useState("300"); // Placeholder value
  const [totalFeedback, setTotalFeedback] = useState("150"); // Placeholder value

  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Fetch user count and daily sign-ups from the API
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user-count-details?days=30"
        );
        console.log("API Response:", response.data); // Log API response

        // Check and set the total user count
        if (response.data && response.data.totalUserCount !== undefined) {
          setUserCount(response.data.totalUserCount);
        } else {
          setUserCount("No data available");
        }

        // Check and set daily user counts (new sign-ups today)
        if (
          response.data.dailyUserCounts &&
          response.data.dailyUserCounts.length > 0
        ) {
          setNewSignUps(response.data.dailyUserCounts);
        } else {
          setNewSignUps("No data available");
        }
      } catch (err) {
        console.error("API error:", err); // Log any API errors
        setError("Error fetching data");
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };

    fetchUserCount();
  }, []); // Empty dependency array ensures this only runs once after the component mounts

  console.log("userCount:", userCount); // Debug log userCount state
  console.log("newSignUps:", newSignUps); // Debug log newSignUps state

  // Conditional rendering for loading state and the DashMetrics component
  return (
    <div style={containerStyle(isDarkMode)}>
      {/* Sidebar Component */}
      <Sidebar isDarkMode={isDarkMode} toggleMode={toggleMode} />

      <div style={mainStyle}>
        <div style={contentStyle(isDarkMode)}>
          <h2>Main Content Area</h2>

          {/* Error handling */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Show loading state */}
          {loading && <p>Loading...</p>}

          {/* Show DashMetrics only when loading is false */}
          {!loading && (
            <DashMetrics
              userCount={userCount || "No data available"} // Fallback value if no data
              newSignUps={newSignUps || "No data available"} // Fallback value if no data
              totalViews={totalViews}
              activeUsers={activeUsers}
              totalFeedback={totalFeedback}
              loading={loading}
            />
          )}

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
