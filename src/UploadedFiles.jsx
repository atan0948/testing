import React, { useEffect, useState } from "react";

function UploadedFiles() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch the uploaded files from the backend API
    const fetchFiles = async () => {
      try {
        // Correctly use template literals for Authorization header
        const response = await fetch("http://172.22.30.136:8000/api/files", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Ensure token is passed correctly
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }

        const data = await response.json();
        setFiles(data); // Update the state with the files data
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles(); // Fetch files when the component mounts
  }, []); // Empty dependency array ensures this effect runs once on mount

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
      {files.length > 0 ? (
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
                  padding: "8px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                File Name
              </th>
              <th
                style={{
                  padding: "8px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                File Path
              </th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  <a
                    href={file.filepath}
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{ color: "#007bff" }}
                  >
                    {file.filename}
                  </a>
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  {file.filepath}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No files uploaded yet.</p>
      )}
    </div>
  );
}

export default UploadedFiles;
