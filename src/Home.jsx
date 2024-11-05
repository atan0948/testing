import React from "react";
import FileUpload from "./FileUpload";
import UploadedFiles from "./UploadedFiles";

function Home() {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "16px",
    padding: "16px",
    width: "100%",
    height: "100vh",
    boxSizing: "border-box",
    justifyItems: "center",
    alignItems: "start",
  };

  return (
    <div style={gridStyle}>
      <FileUpload />
      <UploadedFiles />
    </div>
  );
}

export default Home;
