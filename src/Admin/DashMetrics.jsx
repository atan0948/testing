import React, { useState } from "react";
import { FaRegUserCircle, FaEye, FaComments, FaUsers } from "react-icons/fa";

const DashMetrics = ({
  userCount,
  newSignUps,
  totalViews,
  activeUsers,
  totalFeedback,
  isDarkMode,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const metricsData = [
    {
      title: "Total Users",
      value: userCount || "Not available",
      icon: <FaRegUserCircle />,
    },
    {
      title: "Total Views",
      value: totalViews || "Not available",
      icon: <FaEye />,
    },
    {
      title: "Active Users",
      value: activeUsers || "Not available",
      icon: <FaUsers />,
    },
    {
      title: "Daily User Sign-Ups",
      value: `${newSignUps || 0} Sign-Ups Today`,
      icon: <FaRegUserCircle />,
    },
    {
      title: "Total Feedback",
      value: totalFeedback || "Not available",
      icon: <FaComments />,
    },
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
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            background:
              hoveredIndex === index
                ? isDarkMode
                  ? "#555"
                  : "#ced4da"
                : isDarkMode
                ? "#333"
                : "#e9ecef",
            color: isDarkMode ? "#fff" : "#000",
            padding: "8px 15px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "background 0.3s, transform 0.3s",
            transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
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
