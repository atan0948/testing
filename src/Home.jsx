import React from "react";
import FileUpload from "./FileUpload";

function Home() {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Responsive columns
    gap: "16px", // Space between grid items
    padding: "16px", // Padding around the grid
    width: "100%", // Use 100% width
    height: "100vh",
    boxSizing: "border-box", // Include padding and border in total width and height
    justifyItems: "center", // Center contents horizontally
    alignItems: "start", // Align items to the start
  };

  return (
    <div style={gridStyle}>
      <FileUpload />
      {/* Optionally, you can add more components here */}
    </div>
  );
}

export default Home;
