import React, { useState } from "react";
import FileUpload from "./FileUpload";
import UploadedFiles from "./UploadedFiles";
import Sidebar from "./Admin/Sidebar";

function Home({ isDarkMode, toggleMode }) {
  const containerStyle = {
    display: "flex", // Flexbox layout for sidebar and content
    height: "100vh", // Full height of the viewport
    width: "100vw", // Full width of the viewport
    boxSizing: "border-box", // Ensures padding and border are included in the element's total size
  };

  const contentStyle = {
    flex: 1, // Content takes up the remaining space
    padding: "16px", // Padding for the content area
    overflow: "auto", // Allows scrolling if content overflows
    backgroundColor: isDarkMode ? "#444" : "#fff", // Background color based on dark mode
    color: isDarkMode ? "#fff" : "#000", // Text color based on dark mode
  };

  const fileUploadContainerStyle = {
    display: "flex",
    flexDirection: "column", // Stack file upload and uploaded files vertically
    gap: "16px", // Space between file upload and uploaded files list
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar on the left side */}
      <Sidebar isDarkMode={isDarkMode} toggleMode={toggleMode} />

      {/* Main content area */}
      <div style={contentStyle}>
        <div style={fileUploadContainerStyle}>
          {/* File Upload Section */}
          <FileUpload />

          {/* Uploaded Files Section */}
        </div>
      </div>
    </div>
  );
}

export default Home;
