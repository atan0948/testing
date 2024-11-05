import React from "react";
import {
  FaRegUserCircle,
  FaEye,
  FaPencilAlt,
  FaComments,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa"; // Importing from the Font Awesome set

// Sample static data for the metrics
const metricsData = [
  { title: "Total Users", value: "1,500", icon: <FaRegUserCircle /> },
  { title: "Total Views", value: "2,300", icon: <FaEye /> },
  { title: "Total Posts", value: "700", icon: <FaPencilAlt /> },
  { title: "Total Comments", value: "1,200", icon: <FaComments /> },
  { title: "Active Users", value: "300", icon: <FaUsers /> },
  { title: "New Sign-Ups Today", value: "50", icon: <FaRegUserCircle /> },
  { title: "Total Revenue", value: "$5,000", icon: <FaDollarSign /> },
  { title: "Total Feedback", value: "150", icon: <FaComments /> },
];

const DashMetrics = () => {
  console.log("Metrics Data:", metricsData); // Debugging log

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
            background: "#e9ecef",
            padding: "8px 15px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between", // Pushes icon to the right
          }}
        >
          <div>
            <h4 style={{ margin: "0 0 10px" }}>{metric.title}</h4>
            <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              {metric.value}
            </p>
          </div>
          <span style={{ fontSize: "1.5rem" }}>{metric.icon}</span>{" "}
          {/* Icon on the right */}
        </div>
      ))}
    </div>
  );
};

export default DashMetrics;
