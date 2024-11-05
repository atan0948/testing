import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DashMetrics from "./DashMetrics";
import UserGrowthChart from "./UserGrowthChart"; // Import the User Growth chart
import UserActivityChart from "./UserActivityChart"; // Import the Active vs Inactive Users chart
import ActivityHeatmapChart from "./ActivityHeatmapChart"; // Import the Daily Activity Heatmap chart

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
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  marginTop: "20px",
};

function AdminDash() {
  return (
    <div style={containerStyle}>
      <Sidebar />
      <div style={mainStyle}>
        <Header />
        <div style={contentStyle}>
          <h2>Main Content Area</h2>
          <DashMetrics /> {/* This line will render the metrics */}
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
          </div>
          <div style={{ marginTop: "20px" }}>
            <h4>Daily Activity Heatmap</h4>
            <ActivityHeatmapChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
