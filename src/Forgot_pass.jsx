import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import LoginSmall from "./LoginSmall"; // Header with Login

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

const ForgotPass = () => {
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await api.post("/forgot-password", {
        email: resetEmail,
      });
      if (response.data.success) {
        setMessage("A password reset link has been sent to your email.");
      } else {
        setError("Email not found. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
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
            {message && (
              <p style={{ color: "green", marginTop: "10px" }}>{message}</p>
            )}
            {error && (
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
