import React, { useState } from "react"; // Importing React and useState hook for managing state
import { FaRegUserCircle, FaEye, FaUsers } from "react-icons/fa"; // Importing icons for user, eye, and users
import { BiSolidLike, BiSolidDislike } from "react-icons/bi"; // Importing Like and Dislike icons

const DashMetrics = ({
  userCount,
  newSignUps,
  totalViews,
  activeUsers,
  totalFeedback,
  isDarkMode,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null); // State to manage hovered index for styling

  // Static like and dislike values for feedback
  const [likeCount, setLikeCount] = useState(150); // Initial like count (150)
  const [dislikeCount, setDislikeCount] = useState(20); // Initial dislike count (20)
  const [isLiked, setIsLiked] = useState(true); // State to track if the Like button is clicked (initially true)
  const [isDisliked, setIsDisliked] = useState(false); // State to track if the Dislike button is clicked (initially false)

  // Toggle between like and dislike counts for feedback
  const [feedbackCount, setFeedbackCount] = useState(likeCount); // Default to like count for feedback

  // Define the metrics data to display for the dashboard
  const metricsData = [
    {
      title: "Total Users", // Metric title
      value: userCount || "Not available", // Metric value, fallback to "Not available" if no data
      icon: <FaRegUserCircle />, // Icon for Total Users metric
    },
    {
      title: "Total Views",
      value: totalViews || "Not available",
      icon: <FaEye />, // Icon for Total Views metric
    },
    {
      title: "Active Users",
      value: activeUsers || "Not available",
      icon: <FaUsers />, // Icon for Active Users metric
    },
    {
      title: "Daily User Sign-Ups",
      value: `${newSignUps || 0} Sign-Ups Today`, // Display sign-ups today
      icon: <FaRegUserCircle />, // Icon for Daily User Sign-Ups metric
    },
    {
      title: "Total Feedback", // Metric for total feedback
      value: feedbackCount, // Display the feedback count (150 or 20 based on button clicks)
      icon: (
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Like button */}
          <button
            onClick={() => {
              setIsLiked(true); // Mark like button as clicked
              setIsDisliked(false); // Reset dislike button
              setFeedbackCount(likeCount); // Set feedback count to like count value
            }}
            style={{
              background: "none", // No background for the button
              border: "none", // No border for the button
              cursor: "pointer", // Pointer cursor on hover
              fontSize: "2rem", // Increase font size of the icon
              color: isLiked ? "green" : "gray", // Green if liked, gray if not liked
            }}
          >
            <BiSolidLike /> {/* Like icon */}
          </button>
          {/* Dislike button */}
          <button
            onClick={() => {
              setIsDisliked(true); // Mark dislike button as clicked
              setIsLiked(false); // Reset like button
              setFeedbackCount(dislikeCount); // Set feedback count to dislike count value
            }}
            style={{
              background: "none", // No background for the button
              border: "none", // No border for the button
              cursor: "pointer", // Pointer cursor on hover
              fontSize: "2rem", // Increase font size of the icon
              color: isDisliked ? "red" : "gray", // Red if disliked, gray if not disliked
              marginLeft: "10px", // Add margin between the buttons
            }}
          >
            <BiSolidDislike /> {/* Dislike icon */}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        display: "grid", // Using grid layout to display metrics
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Responsive grid columns
        gap: "20px", // Space between grid items
        margin: "0px 20px", // Margin around the container
        padding: "8px 15px", // Padding inside the container
      }}
    >
      {/* Loop through metricsData array and display each metric */}
      {metricsData.map((metric, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredIndex(index)} // Set hovered index on mouse enter
          onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index on mouse leave
          style={{
            background:
              hoveredIndex === index
                ? isDarkMode
                  ? "#555" // Dark mode hover background
                  : "#ced4da" // Light mode hover background
                : isDarkMode
                ? "#333" // Dark mode background
                : "#e9ecef", // Light mode background
            color: isDarkMode ? "#fff" : "#000", // Text color based on dark mode
            padding: "8px 15px", // Padding for the metric box
            borderRadius: "8px", // Rounded corners for the metric box
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow effect
            display: "flex", // Flex layout for the metric content
            alignItems: "center", // Align items vertically
            justifyContent: "space-between", // Space items out
            transition: "background 0.3s, transform 0.3s", // Smooth transition for hover effect
            transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)", // Scale effect on hover
          }}
        >
          <div>
            <h4 style={{ margin: "0 0 10px" }}>{metric.title}</h4>{" "}
            {/* Metric title */}
            {/* Display the feedback count here, with similar style as others */}
            <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              {metric.title === "Total Feedback"
                ? `${feedbackCount} Feedbacks` // Display feedback count with label
                : metric.value}{" "}
              {/* Display value for other metrics */}
            </p>
          </div>
          <span style={{ fontSize: "1.5rem" }}>{metric.icon}</span>{" "}
          {/* Display the metric icon */}
        </div>
      ))}
    </div>
  );
};

export default DashMetrics;
