import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
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

  // Function to toggle the sidebar open or closed
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Define background color based on light/dark mode
  const baseBackgroundColor = isDarkMode ? "#333" : "#e6e6e6"; // Dark mode background vs light mode background
  const collapsedBackgroundColor = isDarkMode ? "#444" : "#fff"; // Different background color when collapsed

  // Sidebar styles that change dynamically based on the state (open/collapsed) and mode (light/dark)
  const sidebarStyle = {
    backgroundColor: isSidebarOpen
      ? baseBackgroundColor
      : collapsedBackgroundColor, // Changes background color based on sidebar state
    color: isDarkMode ? "#fff" : "#000", // Text color depending on dark/light mode
    height: "100vh", // Full height of the sidebar
    width: isSidebarOpen ? "250px" : "80px", // Sidebar width changes when open/closed
    transition: "width 0.3s ease, background-color 0.3s ease", // Smooth transition for width and background color
    padding: "20px", // Padding for inner elements
    boxSizing: "border-box", // Ensures padding is included in the element's total width/height
  };

  // Styles for the profile section, only visible when the sidebar is open
  const profileStyle = {
    display: isSidebarOpen ? "flex" : "none", // Show profile when sidebar is open
    alignItems: "center", // Align items vertically
    marginBottom: "20px", // Space below the profile section
  };

  // Profile picture styling
  const avatarStyle = {
    width: "60px", // Avatar size
    height: "60px", // Avatar size
    borderRadius: "50%", // Circular shape for the avatar
    marginRight: "15px", // Space between avatar and username
  };

  // Styling for the user's name
  const userNameStyle = {
    fontSize: "1.2rem", // Font size for the name
    fontWeight: "bold", // Bold font for the name
    display: isSidebarOpen ? "inline" : "none", // Name is only visible when sidebar is open
  };

  // Common styles for navigation links
  const linkStyle = {
    padding: "10px 15px", // Padding inside the link
    color: isDarkMode ? "#fff" : "#000", // Text color based on mode
    textDecoration: "none", // Remove underline from links
    display: "flex", // Flexbox layout for icon and text
    alignItems: "center", // Center align the icon and text vertically
    transition: "background-color 0.3s ease", // Smooth transition for background color on hover
    borderRadius: "5px", // Rounded corners
    marginBottom: "10px", // Space between links
  };

  // Hover effect for links
  const hoveredLinkStyle = {
    backgroundColor: "#4cafad", // Background color on hover
  };

  // Styling for the text next to the icons in the links
  const linkTextStyle = {
    marginLeft: "10px", // Space between the icon and text
    display: isSidebarOpen ? "inline" : "none", // Text is only visible when sidebar is open
  };

  // Styling for the icons in the links
  const iconStyle = {
    fontSize: "1.5rem", // Icon size
    display: isSidebarOpen ? "inline" : "none", // Icon is only visible when sidebar is open
  };

  return (
    <div style={sidebarStyle}>
      {/* Hamburger Icon for Sidebar Toggle */}
      <button
        onClick={toggleSidebar} // Toggle sidebar visibility
        style={{
          marginBottom: "20px",
          padding: "10px 15px",
          background: "#ccc", // Background color for the button
          border: "none",
          borderRadius: "5px", // Rounded corners
          cursor: "pointer", // Pointer cursor on hover
          display: "block", // Always show the hamburger icon
        }}
      >
        <FaBars /> {/* Hamburger icon to toggle the sidebar */}
      </button>

      {/* User Profile */}
      <div style={profileStyle}>
        <img src='/profilepic.png' alt='User Avatar' style={avatarStyle} />{" "}
        {/* User profile picture */}
        <span style={userNameStyle}>User Name</span> {/* User name */}
      </div>

      {/* Links */}
      <div>
        <Link
          to='/home' // Use 'Link' from react-router-dom to navigate to /home
          style={{ ...linkStyle, ...(isSidebarOpen && hoveredLinkStyle) }} // Link style with hover effect
        >
          <FaHome style={iconStyle} /> {/* Home icon */}
          <span style={linkTextStyle}>Home</span> {/* Home text */}
        </Link>
        <Link
          to='/admin' // Use 'Link' from react-router-dom to navigate to /admin
          style={{ ...linkStyle, ...(isSidebarOpen && hoveredLinkStyle) }} // Link style with hover effect
        >
          <FaChartBar style={iconStyle} /> {/* Analytics icon */}
          <span style={linkTextStyle}>Analytics</span> {/* Analytics text */}
        </Link>
        <a
          href='#'
          style={{ ...linkStyle, ...(isSidebarOpen && hoveredLinkStyle) }} // Link style with hover effect
        >
          <FaUsers style={iconStyle} /> {/* Users icon */}
          <span style={linkTextStyle}>Users</span> {/* Users text */}
        </a>
        <a
          href='#'
          style={{ ...linkStyle, ...(isSidebarOpen && hoveredLinkStyle) }} // Link style with hover effect
        >
          <FaCog style={iconStyle} /> {/* Settings icon */}
          <span style={linkTextStyle}>Settings</span> {/* Settings text */}
        </a>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleMode} // Function to toggle between dark and light mode
        style={{
          marginTop: "20px",
          padding: "10px 15px",
          background: isDarkMode ? "#444" : "#ddd", // Background color for the button
          color: isDarkMode ? "#fff" : "#000", // Text color based on mode
          border: "none",
          borderRadius: "5px", // Rounded corners
          cursor: "pointer", // Pointer cursor on hover
          display: isSidebarOpen ? "flex" : "none", // Dark mode button visible only when sidebar is open
          alignItems: "center", // Align button contents horizontally
        }}
      >
        {isDarkMode ? <FaSun /> : <FaMoon />}{" "}
        {/* Icon for dark or light mode */}
        <span style={{ marginLeft: "10px" }}>
          {isDarkMode ? "Light Mode" : "Dark Mode"} {/* Toggle text */}
        </span>
      </button>
    </div>
  );
};

export default Sidebar;
