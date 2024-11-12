import React from "react";
import { FaRegUserCircle, FaEye, FaUsers, FaComments } from "react-icons/fa";

const DashMetrics = ({
  userCount,
  totalViews,
  activeUsers,
  newSignUps,
  totalFeedback,
  isDarkMode,
}) => {
  const metricsData = [
    { title: "Total Users", value: userCount, icon: <FaRegUserCircle /> },
    { title: "Total Views", value: totalViews, icon: <FaEye /> },
    { title: "Active Users", value: activeUsers, icon: <FaUsers /> },
    {
      title: "New Sign-Ups Today",
      value: newSignUps,
      icon: <FaRegUserCircle />,
    },
    { title: "Total Feedback", value: totalFeedback, icon: <FaComments /> },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
        margin: "0px 20px",
        padding: "8px 15px",
      }}
    >
      {metricsData.map((metric, index) => (
        <div
          key={index}
          style={{
            background: isDarkMode ? "#444" : "#e9ecef",
            padding: "8px 15px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "background 0.3s",
          }}
        >
          <div>
            <h4 style={{ margin: "0 0 10px" }}>{metric.title}</h4>
            <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              {metric.value}
            </p>
          </div>
          <span style={{ fontSize: "1.5rem" }}>{metric.icon}</span>
        </div>
      ))}
    </div>
  );
};

export default DashMetrics;
