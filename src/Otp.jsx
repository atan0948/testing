// Otp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api"; // Axios instance for API calls

const otpInputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "14px",
  marginBottom: "20px",
  width: "100%",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s",
  width: "100%",
};

const Otp = ({ email }) => {
  const [otp, setOtp] = useState(""); // Stores OTP entered by the user
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [message, setMessage] = useState(""); // Success or error message
  const [error, setError] = useState(""); // Error message
  const navigate = useNavigate(); // React Router hook to navigate

  // Handle OTP submission
  const handleOtpSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Reset any previous messages
    setError(""); // Reset any previous errors

    try {
      const response = await api.post("/verify-otp", {
        email: email,
        otp: otp,
      });

      if (response.data.success) {
        setMessage("OTP verified successfully!");
        setTimeout(() => {
          navigate("/reset-password"); // Navigate to reset password page after successful OTP verification
        }, 2000);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        background: "#f7f7f7",
        borderRadius: "8px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Enter OTP</h2>
      <p style={{ textAlign: "center" }}>
        We have sent an OTP to your email. Please enter it below to continue.
      </p>
      <form onSubmit={handleOtpSubmit}>
        <input
          type='text'
          placeholder='Enter OTP'
          style={otpInputStyle}
          value={otp}
          onChange={e => setOtp(e.target.value)}
          required
          disabled={loading}
        />
        <button type='submit' style={buttonStyle} disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
        {message && (
          <p style={{ color: "green", marginTop: "10px" }}>{message}</p>
        )}
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Otp;
