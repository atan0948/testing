import React from "react";

const SidebarStyle = {
  background: "gray", // Background color
  color: "black", // Text color
  textAlign: "center", // Center text
  height: "100vh", // Set to 100% viewport height
  width: "20%", // Width for the sidebar
  padding: "20px", // Padding around the content
  boxSizing: "border-box", // Include padding in the width/height calculation
};

function Sidebar() {
  return <div style={SidebarStyle}>Sidebar</div>; // Apply the style here
}

export default Sidebar;
