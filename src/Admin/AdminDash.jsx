import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DashMetrics from "./DashMetrics";

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

function AdminDash() {
  return (
    <div style={containerStyle}>
      <Sidebar />
      <div style={mainStyle}>
        <Header />
        <div style={contentStyle}>
          <h2>Main Content Area</h2>
          <DashMetrics /> {/* This line will render the metrics */}
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
