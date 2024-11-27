import React, { useEffect, useState } from "react";

function UploadedFiles() {
  const [files, setFiles] = useState([]);
  const token = localStorage.getItem("token"); // Get token from localStorage

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("http://172.22.30.136:8000/api/files", {
          method: "GET",
          headers: {
            // Correctly include the token with proper string interpolation
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }

        const data = await response.json();
        setFiles(data); // Assuming the API returns an array of files
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [token]); // Fetch files whenever the token changes

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Uploaded Files</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {files.map((file) => (
          <li key={file.id} style={{ marginBottom: "10px" }}>
            <a
              // Correctly link to the file's URL using string interpolation
              href={`http://172.22.30.136:8000/files/${file.filename}`}
              target='_blank'
              rel='noopener noreferrer'
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              {file.filename} {/* Display the file name */}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UploadedFiles;
