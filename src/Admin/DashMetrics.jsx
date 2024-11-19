import React, { useState } from "react";
import { FaRegUserCircle, FaEye, FaComments, FaUsers } from "react-icons/fa";

const DashMetrics = ({
  userCount,
  dailyUserCounts, // New prop to pass daily user counts
  totalViews,
  activeUsers,
  totalFeedback,
  loading,
  isDarkMode, // Receive isDarkMode as a prop to customize styles based on dark/light mode
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const metricsData = [
    {
      title: "Total Users",
      value: userCount || "No data available", // Fallback value if no userCount
      icon: <FaRegUserCircle />,
    },
    {
      title: "Total Views",
      value: totalViews || "No data available", // Fallback value if no totalViews
      icon: <FaEye />,
    },
    {
      title: "Active Users",
      value: activeUsers || "No data available", // Fallback value if no activeUsers
      icon: <FaUsers />,
    },
    {
      title: "Daily User Sign-Ups (Last 30 Days)",
      value:
        dailyUserCounts && dailyUserCounts.length
          ? `${dailyUserCounts.length} Days of Data`
          : "No data available", // Check for dailyUserCounts length
      icon: <FaRegUserCircle />,
    },
    {
      title: "Total Feedback",
      value: totalFeedback || "No data available", // Fallback value if no totalFeedback
      icon: <FaComments />,
    },
  ];

  // Show a loading spinner while the data is being fetched
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <p>Loading...</p>
      </div>
    );
  }

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
                  : "#ced4da" // Darker background on hover in dark mode
                : isDarkMode
                ? "#333"
                : "#e9ecef", // Default dark or light background
            color: isDarkMode ? "#fff" : "#000", // Ensure text is always readable
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
              {metric.value || "Not available"}{" "}
              {/* Display "Not available" if value is empty */}
            </p>
          </div>
          <span style={{ fontSize: "1.5rem" }}>{metric.icon}</span>
        </div>
      ))}
    </div>
  );
};

export default DashMetrics;
