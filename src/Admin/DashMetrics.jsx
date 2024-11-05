import React, { useState } from "react"; // Change: Added useState import
import { FaRegUserCircle, FaEye, FaComments, FaUsers } from "react-icons/fa"; // Importing from the Font Awesome set

// Sample static data for the metrics
const metricsData = [
  { title: "Total Users", value: "1,500", icon: <FaRegUserCircle /> },
  { title: "Total Views", value: "2,300", icon: <FaEye /> },
  { title: "Active Users", value: "300", icon: <FaUsers /> },
  { title: "New Sign-Ups Today", value: "50", icon: <FaRegUserCircle /> },
  { title: "Total Feedback", value: "150", icon: <FaComments /> },
];

const DashMetrics = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null); // Change: State for hovered index

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
          onMouseEnter={() => setHoveredIndex(index)} // Change: Set hovered index
          onMouseLeave={() => setHoveredIndex(null)} // Change: Reset hovered index
          style={{
            background: hoveredIndex === index ? "#ced4da" : "#e9ecef", // Change: Change background color on hover
            padding: "8px 15px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "background 0.3s, transform 0.3s", // Change: Smooth transition
            transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)", // Change: Grow effect
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
