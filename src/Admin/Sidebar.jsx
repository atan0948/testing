import React, { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaChartBar,
  FaCog,
  FaMoon,
  FaSun,
} from "react-icons/fa";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMode = () => setIsDarkMode(!isDarkMode);

  const sidebarStyle = {
    backgroundColor: isDarkMode ? "#333" : "#f4f4f4",
    color: isDarkMode ? "#fff" : "#000",
    height: "100vh",
    width: isSidebarOpen ? "250px" : "115px",
    transition: "width 0.3s ease",
    padding: "20px",
    boxSizing: "border-box",
  };

  const profileStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  };

  const avatarStyle = {
    width: "80px", // Increased size
    height: "80px", // Increased size
    borderRadius: "50%",
    marginRight: "15px", // Increased margin for better spacing
  };

  const userNameStyle = {
    fontSize: "1.5rem", // Larger text size
    fontWeight: "bold", // Optional: makes the username bolder
  };

  const linkStyle = {
    padding: "10px",
    color: "white",
    textDecoration: "none",
    display: "block",
    transition: "background-color 0.3s ease",
  };

  const hoveredLinkStyle = {
    backgroundColor: "#4CAF50", // Hover effect color
  };

  return (
    <div style={sidebarStyle}>
      <button
        onClick={toggleSidebar}
        style={{ marginBottom: "20px", padding: "10px", background: "#ccc" }}
      >
        {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>

      {/* User Profile */}
      <div style={profileStyle}>
        <img src='/profile-pic.jfif' alt='Profile' style={avatarStyle} />
        <span style={userNameStyle}>User Name</span>
      </div>

      {/* Links */}
      <div>
        <a href='#' style={{ ...linkStyle, ...hoveredLinkStyle }}>
          <FaHome /> {isSidebarOpen && "Home"}
        </a>
        <a href='#' style={{ ...linkStyle, ...hoveredLinkStyle }}>
          <FaUsers /> {isSidebarOpen && "Users"}
        </a>
        <a href='#' style={{ ...linkStyle, ...hoveredLinkStyle }}>
          <FaChartBar /> {isSidebarOpen && "Analytics"}
        </a>
        <a href='#' style={{ ...linkStyle, ...hoveredLinkStyle }}>
          <FaCog /> {isSidebarOpen && "Settings"}
        </a>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleMode}
        style={{
          marginTop: "20px",
          padding: "10px",
          background: isDarkMode ? "#444" : "#ddd",
          color: isDarkMode ? "#fff" : "#000",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {isDarkMode ? <FaSun /> : <FaMoon />}{" "}
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default Sidebar;
