import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"; // Adjust path if needed
import DashMetrics from "./DashMetrics"; // Adjust path if needed
import UserGrowthChart from "./UserGrowthChart"; // Adjust path if needed
import UserActivityChart from "./UserActivityChart"; // Adjust path if needed
import ActivityHeatmapChart from "./ActivityHeatmapChart"; // Adjust path if needed

const containerStyle = isDarkMode => ({
  display: "flex",
  height: "100vh",
  width: "100vw",
  margin: "0",
  backgroundColor: isDarkMode ? "#333" : "#f8f9fa",
});

const mainStyle = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

const contentStyle = isDarkMode => ({
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
  const [userCount, setUserCount] = useState(null); // State to hold the user count
  const [totalViews, setTotalViews] = useState("2,300");
  const [activeUsers, setActiveUsers] = useState("300");
  const [newSignUps, setNewSignUps] = useState("50");
  const [totalFeedback, setTotalFeedback] = useState("150");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get("/user-count?days=30");
        console.log(response.data); // Log the response to inspect the data
        if (response.data && response.data.userCount) {
          setUserCount(response.data.userCount); // Set the user count if the data is correct
        } else {
          setUserCount(0); // If userCount is not present, set it to 0
        }
      } catch (err) {
        console.error(err); // Log any errors to the console
        setError("Failed to fetch user count.");
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
          <h2>Main Content Area</h2>
          <DashMetrics
            userCount={loading ? "Loading..." : userCount || "Data unavailable"}
            totalViews={totalViews}
            activeUsers={activeUsers}
            newSignUps={newSignUps}
            totalFeedback={totalFeedback}
            isDarkMode={isDarkMode}
          />
          <h3>User Insights</h3>
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
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
