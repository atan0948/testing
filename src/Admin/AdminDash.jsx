import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import DashMetrics from "./DashMetrics";
import UserGrowthChart from "./UserGrowthChart";

// Container styles - used for the overall layout of the dashboard
const containerStyle = (isDarkMode) => ({
  display: "flex", // Flexbox layout for the container
  height: "100vh", // Full viewport height
  width: "100vw", // Full viewport width
  margin: "0", // Remove default margin
  backgroundColor: isDarkMode ? "#333" : "#f8f9fa", // Conditional background color based on dark mode
});

// Main and content styles - styles for the main content area
const mainStyle = { display: "flex", flexDirection: "column", flex: 1 }; // Layout of the main section in a column
const contentStyle = (isDarkMode) => ({
  flex: 1, // Takes up all available space
  backgroundColor: isDarkMode ? "#444" : "white", // Conditional background color based on dark mode
  padding: "20px", // Padding for the content area
  overflow: "auto", // Enables scrolling if content overflows
  color: isDarkMode ? "#fff" : "#000", // Conditional text color based on dark mode
});

// Styles for the chart container to display charts in a grid layout
const chartContainerStyle = {
  display: "grid", // Grid layout for the charts
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // Responsive grid with columns
  gap: "20px", // Space between grid items
  marginTop: "20px", // Top margin for spacing
};

// AdminDash component, the main component for the Admin Dashboard page
function AdminDash({ isDarkMode, toggleMode }) {
  const [userCount, setUserCount] = useState(null); // State to store the total user count
  const [totalViews, setTotalViews] = useState("2,300"); // Static value for total views
  const [activeUsers, setActiveUsers] = useState("300"); // Static value for active users
  const [newSignUps, setNewSignUps] = useState(0); // State to store the number of new sign-ups today
  const [totalFeedback, setTotalFeedback] = useState("150"); // Static value for total feedback count
  const [loading, setLoading] = useState(true); // State to track loading state for data fetching
  const [error, setError] = useState(null); // State to track errors during data fetching

  // useEffect hook to fetch user count data when the component is mounted
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        // Making an API call to fetch user count data for the last 30 days
        const response = await axios.get(
          "http://172.22.30.136:8000/api/user-count-details?days=30"
        );
        setUserCount(response.data.totalUserCount || "Not available"); // Setting total user count

        // Get today's date in YYYY-MM-DD format (ensure it's in UTC)
        const today = new Date().toISOString().split("T")[0];

        // Find data for today's user count from the response
        const todayData = response.data.dailyUserCounts?.find(
          (item) => item.date === today
        );
        setNewSignUps(todayData?.user_count || 0); // Setting new sign-ups for today
      } catch (err) {
        // Handle errors and set error message
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after the API call finishes
      }
    };

    fetchUserCount(); // Invoke the data fetch function
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div style={containerStyle(isDarkMode)}>
      {/* Sidebar component to show navigation options */}
      <Sidebar isDarkMode={isDarkMode} toggleMode={toggleMode} />
      <div style={mainStyle}>
        <div style={contentStyle(isDarkMode)}>
          <h2>Admin Dashboard</h2>

          {/* Display loading, error, or dashboard metrics */}
          {error ? (
            <p style={{ color: "red" }}>{error}</p> // Show error message if there's an error
          ) : loading ? (
            <p>Loading...</p> // Show loading state if data is still being fetched
          ) : (
            <>
              {/* DashMetrics component to show the dashboard metrics */}
              <DashMetrics
                userCount={userCount}
                newSignUps={newSignUps}
                totalViews={totalViews}
                activeUsers={activeUsers}
                totalFeedback={totalFeedback}
                isDarkMode={isDarkMode}
              />
              <div style={chartContainerStyle}>
                {/* User Growth chart */}
                <div>
                  <h4>User Growth Over Time</h4>
                  <UserGrowthChart />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
