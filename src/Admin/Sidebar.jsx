import React, { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaChartBar,
  FaCog,
  FaMoon,
  FaSun,
  FaBars,
} from "react-icons/fa";

const Sidebar = ({ isDarkMode, toggleMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Initially collapsed

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Define base background color for light and dark modes
  const baseBackgroundColor = isDarkMode ? "#333" : "#e6e6e6"; // White for light mode and dark for dark mode
  const collapsedBackgroundColor = isDarkMode ? "#444" : "#fff"; // Slightly darker background for collapsed state

  const sidebarStyle = {
    backgroundColor: isSidebarOpen
      ? baseBackgroundColor
      : collapsedBackgroundColor,
    color: isDarkMode ? "#fff" : "#000",
    height: "100vh",
    width: isSidebarOpen ? "250px" : "80px", // Sidebar width changes based on state
    transition: "width 0.3s ease, background-color 0.3s ease", // Smooth transition for width and background
    padding: "20px",
    boxSizing: "border-box",
  };

  const profileStyle = {
    display: isSidebarOpen ? "flex" : "none", // Show only when sidebar is open
    alignItems: "center",
    marginBottom: "20px",
  };

  const avatarStyle = {
    width: "60px", // Adjusted size
    height: "60px", // Adjusted size
    borderRadius: "50%",
    marginRight: "15px",
  };

  const userNameStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    display: isSidebarOpen ? "inline" : "none", // Show name only when sidebar is open
  };

  const linkStyle = {
    padding: "10px 15px",
    color: isDarkMode ? "#fff" : "#000",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    transition: "background-color 0.3s ease",
    borderRadius: "5px",
    marginBottom: "10px",
  };

  const hoveredLinkStyle = {
    backgroundColor: "#4CAF50",
  };

  const linkTextStyle = {
    marginLeft: "10px", // Spacing between icon and text
    display: isSidebarOpen ? "inline" : "none", // Only show text when sidebar is open
  };

  const iconStyle = {
    fontSize: "1.5rem", // Icon size
    display: isSidebarOpen ? "inline" : "none", // Only show icon when sidebar is open
  };

  return (
    <div style={sidebarStyle}>
      {/* Hamburger Icon for Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        style={{
          marginBottom: "20px",
          padding: "10px 15px",
          background: "#ccc",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          display: "block", // Always show hamburger icon
        }}
      >
        <FaBars />
      </button>

      {/* User Profile */}
      <div style={profileStyle}>
        <img src='/profile-pic.jfif' alt='User Avatar' style={avatarStyle} />
        <span style={userNameStyle}>User Name</span>
      </div>

      {/* Links */}
      <div>
        <a
          href='#'
          style={{ ...linkStyle, ...(isSidebarOpen && hoveredLinkStyle) }}
        >
          <FaHome style={iconStyle} />
          <span style={linkTextStyle}>Home</span>
        </a>
        <a
          href='#'
          style={{ ...linkStyle, ...(isSidebarOpen && hoveredLinkStyle) }}
        >
          <FaUsers style={iconStyle} />
          <span style={linkTextStyle}>Users</span>
        </a>
        <a
          href='#'
          style={{ ...linkStyle, ...(isSidebarOpen && hoveredLinkStyle) }}
        >
          <FaChartBar style={iconStyle} />
          <span style={linkTextStyle}>Analytics</span>
        </a>
        <a
          href='#'
          style={{ ...linkStyle, ...(isSidebarOpen && hoveredLinkStyle) }}
        >
          <FaCog style={iconStyle} />
          <span style={linkTextStyle}>Settings</span>
        </a>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleMode}
        style={{
          marginTop: "20px",
          padding: "10px 15px",
          background: isDarkMode ? "#444" : "#ddd",
          color: isDarkMode ? "#fff" : "#000",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          display: isSidebarOpen ? "flex" : "none", // Only show dark mode button when sidebar is open
          alignItems: "center",
        }}
      >
        {isDarkMode ? <FaSun /> : <FaMoon />}
        <span style={{ marginLeft: "10px" }}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </span>
      </button>
    </div>
  );
};

export default Sidebar;
