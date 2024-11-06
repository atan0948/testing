import React, { useState } from "react";

const formStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "400px", // Maximum width of the form
  margin: "0 auto",
  boxSizing: "border-box",
};

const inputStyle = {
  marginBottom: "15px",
  padding: "10px",
  borderRadius: "5px",
  width: "100%", // Makes input take full width
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width: "100%", // Ensures the button takes full width of the form
  maxWidth: "400px", // Matches the form's maximum width
  height: "40px", // Fixed height for the button
  textAlign: "center", // Center text inside button
  display: "flex", // Flexbox for centering text horizontally
  justifyContent: "center",
  alignItems: "center",
};

const messageStyle = {
  marginTop: "10px",
  textAlign: "center",
  color: "#28a745",
};

const errorStyle = {
  marginTop: "10px",
  textAlign: "center",
  color: "#dc3545",
};

const blockedFileTypes = [
  ".html",
  ".htm",
  ".zip",
  ".rar",
  ".7z",
  ".txt",
  ".gif",
  ".exe",
];

function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
      if (blockedFileTypes.includes(`.${fileExtension}`)) {
        setError(
          `This file type is not allowed: ${fileExtension.toUpperCase()}`
        );
        setFile(null);
        setMessage("");
      } else {
        setFile(selectedFile);
        setMessage(`File selected: ${selectedFile.name}`);
        setError("");
      }
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setMessage("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5002/home", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 400) {
        setError("Invalid request. Please check the file and try again.");
        setMessage(""); // Clear the uploading message
      } else if (response.status === 500) {
        setError("Server error. Please try again later.");
        setMessage(""); // Clear the uploading message
      } else if (response.ok) {
        const data = await response.json();
        setMessage("File uploaded successfully: " + data.filename);
        setFile(null); // Clear the file state
        document.getElementById("fileInput").value = ""; // Clear the input field value
        setError("");
      } else {
        setError("File upload failed. Please try again.");
        setMessage(""); // Clear the uploading message
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("An error occurred during file upload. Please try again.");
      setMessage(""); // Clear the uploading message
    }
  };

  return (
    <div style={formStyle}>
      <h2
        style={{
          textAlign: "center",
          color: "#000",
          fontSize: "2rem",
          marginBottom: "20px",
        }}
      >
        File Upload
      </h2>
      <input
        type='file'
        onChange={handleFileChange}
        style={inputStyle}
        id='fileInput' // Assigning an id to the input field for easy reference
      />
      <button onClick={handleFileUpload} style={buttonStyle} disabled={!file}>
        Upload File
      </button>
      {message && <p style={messageStyle}>{message}</p>}
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
}

export default FileUpload;
