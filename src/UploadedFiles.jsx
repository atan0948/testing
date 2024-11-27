import React, { useEffect, useState } from "react";

function UploadedFiles() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch the uploaded files from your API (if you have an endpoint for that)
    const fetchFiles = async () => {
      try {
        const response = await fetch("http://172.22.30.136:8000/api/files"); // Adjust the endpoint as needed
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
  }, []);

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
              href={file.url}
              target='_blank'
              rel='noopener noreferrer'
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UploadedFiles;
