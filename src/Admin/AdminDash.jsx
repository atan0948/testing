import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DashMetrics from "./DashMetrics";
import UserGrowthChart from "./UserGrowthChart";
import UserActivityChart from "./UserActivityChart";
import ActivityHeatmapChart from "./ActivityHeatmapChart";

const containerStyle = {
  display: "flex",
  height: "100vh",
  width: "100vw",
  margin: "0",
  backgroundColor: "#f8f9fa",
};

const mainStyle = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

const contentStyle = {
  flex: 1,
  backgroundColor: "white",
  padding: "20px",
  overflow: "auto",
};

const chartContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // Responsive grid
  gap: "20px",
  marginTop: "20px",
};

function AdminDash() {
  // These would typically come from an API or state management
  const userCount = "1,500"; // Example user count
  const totalViews = "2,300"; // Example total views
  const activeUsers = "300"; // Example active users
  const newSignUps = "50"; // Example new sign-ups today
  const totalFeedback = "150"; // Example total feedback

  return (
    <div style={containerStyle}>
      <Sidebar />
      <div style={mainStyle}>
        <Header />
        <div style={contentStyle}>
          <h2>Main Content Area</h2>
          <DashMetrics
            userCount={userCount}
            totalViews={totalViews}
            activeUsers={activeUsers}
            newSignUps={newSignUps}
            totalFeedback={totalFeedback}
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
