import React, { useEffect, useState } from "react";

function UploadedFiles() {
  const [files, setFiles] = useState([]);
  const token = localStorage.getItem("token"); // Get token from localStorage

  // Fetch the files data when the component mounts
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("http://172.22.30.136:8000/api/files", {
          method: "GET",
          headers: {
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
      {files.length === 0 ? (
        <p style={{ textAlign: "center" }}>No files uploaded yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                  backgroundColor: "#f4f4f4",
                }}
              >
                File Name
              </th>
              <th
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                  backgroundColor: "#f4f4f4",
                }}
              >
                File Size
              </th>
              <th
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                  backgroundColor: "#f4f4f4",
                }}
              >
                Download
              </th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  {file.filename}
                </td>
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  {/* Check if file.size exists, if not display "N/A" */}
                  {file.size ? `${(file.size / 1024).toFixed(2)} KB` : "N/A"}
                </td>
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  {/* Ensure the correct URL format for downloading */}
                  <a
                    href={`http://172.22.30.136:8000/files/${file.filename}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{
                      textDecoration: "none",
                      color: "#007bff",
                    }}
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UploadedFiles;
