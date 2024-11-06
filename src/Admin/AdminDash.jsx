import React from "react";
import Sidebar from "./Sidebar"; // Adjust path if needed
import Header from "./Header"; // Adjust path if needed
import DashMetrics from "./DashMetrics"; // Adjust path if needed
import UserGrowthChart from "./UserGrowthChart"; // Adjust path if needed
import UserActivityChart from "./UserActivityChart"; // Adjust path if needed
import ActivityHeatmapChart from "./ActivityHeatmapChart"; // Adjust path if needed

const containerStyle = (isDarkMode) => ({
  display: "flex",
  height: "100vh",
  width: "100vw",
  margin: "0",
  backgroundColor: isDarkMode ? "#333" : "#f8f9fa", // Conditional background color for dark mode
});

const mainStyle = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

const contentStyle = (isDarkMode) => ({
  flex: 1,
  backgroundColor: isDarkMode ? "#444" : "white", // Conditional background for content area
  padding: "20px",
  overflow: "auto",
  color: isDarkMode ? "#fff" : "#000", // Conditional text color
});

const chartContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

function AdminDash({ isDarkMode, toggleMode }) {
  const userCount = "1,500"; // Example user count
  const totalViews = "2,300"; // Example total views
  const activeUsers = "300"; // Example active users
  const newSignUps = "50"; // Example new sign-ups today
  const totalFeedback = "150"; // Example total feedback

  return (
    <div style={containerStyle(isDarkMode)}>
      <Sidebar isDarkMode={isDarkMode} toggleMode={toggleMode} />
      <div style={mainStyle}>
        <Header />
        <div style={contentStyle(isDarkMode)}>
          <h2>Main Content Area</h2>
          <DashMetrics
            userCount={userCount}
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
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
