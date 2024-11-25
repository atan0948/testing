import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import DashMetrics from "./DashMetrics";
import UserGrowthChart from "./UserGrowthChart";

// Container styles
const containerStyle = (isDarkMode) => ({
  display: "flex",
  height: "100vh",
  width: "100vw",
  margin: "0",
  backgroundColor: isDarkMode ? "#333" : "#f8f9fa",
});

// Main and content styles
const mainStyle = { display: "flex", flexDirection: "column", flex: 1 };
const contentStyle = (isDarkMode) => ({
  flex: 1,
  backgroundColor: isDarkMode ? "#444" : "white",
  padding: "20px",
  overflow: "auto",
  color: isDarkMode ? "#fff" : "#000",
});

const chartContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

function AdminDash({ isDarkMode, toggleMode }) {
  const [userCount, setUserCount] = useState(null);
  const [newSignUps, setNewSignUps] = useState(0);
  const [totalViews, setTotalViews] = useState("2,300");
  const [activeUsers, setActiveUsers] = useState("300");
  const [totalFeedback, setTotalFeedback] = useState("150");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(
          "http://172.22.30.136:8000/api/user-count-details?days=30"
        );

        setUserCount(response.data.totalUserCount || "Not available");

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split("T")[0];
        const todayData = response.data.dailyUserCounts?.find(
          (item) => item.date === today
        );
        setNewSignUps(todayData?.user_count || 0);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div style={containerStyle(isDarkMode)}>
      <Sidebar isDarkMode={isDarkMode} toggleMode={toggleMode} />
      <div style={mainStyle}>
        <div style={contentStyle(isDarkMode)}>
          <h2>Admin Dashboard</h2>

          {error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <DashMetrics
                userCount={userCount}
                newSignUps={newSignUps}
                totalViews={totalViews}
                activeUsers={activeUsers}
                totalFeedback={totalFeedback}
                isDarkMode={isDarkMode}
              />
              <div style={chartContainerStyle}>
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
