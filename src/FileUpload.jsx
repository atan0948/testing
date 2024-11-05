import React, { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const formStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    boxSizing: "border-box",
  };

  const inputStyle = {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "5px",
    width: "100%",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    transition: "background-color 0.3s",
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
    "exe",
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage(`File selected: ${selectedFile.name}`);
      setError("");
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (blockedFileTypes.includes(`.${fileExtension}`)) {
      setError(`This file type is not allowed: ${fileExtension.toUpperCase()}`);
      setFile(null);
      setMessage("");
      return;
    }

    setUploading(true);
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

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || "File upload failed.");
        setMessage("");
      } else {
        const data = await response.json();
        setMessage("File uploaded successfully: " + data.filename);
        setFile(null);
        setError("");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("An error occurred during file upload. Please try again.");
      setMessage("");
    } finally {
      setUploading(false);
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
      <input type='file' onChange={handleFileChange} style={inputStyle} />
      <button
        onClick={handleFileUpload}
        style={buttonStyle}
        disabled={
          uploading ||
          !file ||
          (file &&
            blockedFileTypes.includes(file.name.split(".").pop().toLowerCase()))
        }
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>
      {message && <p style={messageStyle}>{message}</p>}
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
}

export default FileUpload;
