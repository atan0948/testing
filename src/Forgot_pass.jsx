import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api"; // Import the configured axios instance for API calls
import LoginSmall from "./LoginSmall"; // A component that handles login display

// Inline styles for the form and layout
const inputStyle = {
  marginRight: "10px",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "14px",
  minWidth: "150px",
  flex: "1 1 auto",
};

const buttonStyle = {
  padding: "8px 15px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const containerStyle = {
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
  height: "100vh",
  width: "100%",
  fontFamily: "Arial, sans-serif",
};

const headerStyle = {
  height: "75px",
  width: "100%",
  background: "white",
  display: "flex",
  alignItems: "center",
  padding: "0 20px",
  boxSizing: "border-box",
};

const footerStyle = {
  height: "75px",
  width: "100%",
  background: "white",
  textAlign: "center",
  lineHeight: "80px",
  fontSize: "18px",
};

const contentStyle = {
  display: "grid",
  placeItems: "center",
  padding: "10px",
  background: "#f7f7f7",
};

const mainStyle = {
  width: "100%",
  maxWidth: "600px",
  background: "#fff",
  color: "black",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
};

// ForgotPassword Component
const ForgotPass = () => {
  const [resetEmail, setResetEmail] = useState(""); // Stores the email input by the user
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [message, setMessage] = useState(""); // Success message
  const [error, setError] = useState(""); // Error message
  const [errorType, setErrorType] = useState(""); // Tracks error type (for conditional rendering)
  const navigate = useNavigate(); // React Router hook to navigate (if needed)

  // Validate email format (basic regex)
  const validateEmail = email => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  // Handle form submission
  const handlePasswordReset = async e => {
    e.preventDefault(); // Prevent form from submitting normally
    setLoading(true); // Set loading state to true
    setMessage(""); // Reset any previous messages
    setError(""); // Reset any previous errors
    setErrorType(""); // Reset error type

    // Validate email before sending it
    if (!validateEmail(resetEmail)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      // API call to backend (FastAPI)
      const response = await api.post("/forgot-password", {
        email: resetEmail, // Send the email entered by the user
      });

      // Check if the backend responded with a success message
      if (response.data.message) {
        setMessage(response.data.message); // Success message from the backend
        setResetEmail(""); // Clear the input field after successful request
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after 2 seconds
        }, 2000);
      } else {
        // If the backend does not return a success message, display an error
        setError("Email not found. Would you like to sign up?");
        setErrorType("email-not-found");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        if (error.response.data.detail === "Email not found.") {
          setError("Email not found. Would you like to sign up?");
          setErrorType("email-not-found");
        } else {
          setError("An error occurred. Please try again later.");
          setErrorType("general");
        }
      } else {
        setError("An error occurred. Please try again later.");
        setErrorType("general");
      }
    } finally {
      setLoading(false); // Reset loading state once the request is complete
    }
  };

  return (
    <div style={containerStyle}>
      {/* Header with Login Form */}
      <div style={headerStyle}>
        <LoginSmall loading={loading} />
      </div>

      {/* Main content area for password reset */}
      <div style={contentStyle}>
        <div style={mainStyle}>
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
            Forgot Password
          </h2>
          <p style={{ textAlign: "left", marginBottom: "10px" }}>
            Please enter your email for your account.
          </p>
          <form onSubmit={handlePasswordReset}>
            <input
              type='email'
              placeholder='Enter your email'
              style={{ ...inputStyle, width: "95%" }}
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type='submit'
              style={{ ...buttonStyle, marginTop: "10px" }}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            {/* Show messages based on the result of the request */}
            {message && (
              <p style={{ color: "green", marginTop: "10px" }}>{message}</p>
            )}
            {error && errorType === "email-not-found" && (
              <p style={{ color: "red", marginTop: "10px" }}>
                {error}{" "}
                <a
                  href='/signup'
                  style={{ color: "#007bff", textDecoration: "underline" }}
                >
                  Sign Up
                </a>
              </p>
            )}
            {error && errorType === "general" && (
              <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <div style={footerStyle}>Footer</div>
    </div>
  );
};

export default ForgotPass;
