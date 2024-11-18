import React, { useState } from "react";
import api from "./api"; // Import your API configuration

const Otp = ({ token, onSuccess, onError }) => {
  const [otp, setOtp] = useState(""); // OTP entered by the user
  const [newPassword, setNewPassword] = useState(""); // New password entered by the user
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message

  // Handle OTP and new password submission
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/reset-password", {
        token,
        otp,
        new_password: newPassword,
      });

      onSuccess("Password has been reset successfully!"); // Pass success message to parent
    } catch (error) {
      setError(
        error.response?.data?.detail || "An error occurred. Please try again."
      );
      onError(
        error.response?.data?.detail || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Enter the OTP and New Password</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter OTP'
          value={otp}
          onChange={e => setOtp(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type='password'
          placeholder='New password'
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button type='submit' disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Otp;
