import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

function Forgot_pass() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState(""); // For the forgot password feature
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const container = {
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    height: "100vh",
    width: "100%",
    fontFamily: "Arial, sans-serif",
  };

  const headerStyle = {
    height: "80px",
    width: "100%",
    background: "white",
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
    boxSizing: "border-box",
  };

  // Form styles
  const loginFormStyle = {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto", // Pushes the form to the right
    flexWrap: "wrap", // Ensures elements wrap on smaller screens
  };

  const inputStyle = {
    marginRight: "10px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    minWidth: "150px",
    flex: "1 1 auto", // Allows inputs to grow and shrink
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

  const contentStyle = {
    display: "grid",
    placeItems: "center",
    padding: "20px",
    background: "#f7f7f7",
  };

  const Main = {
    width: "100%",
    maxWidth: "600px", // Max width for larger screens
    background: "#fff",
    color: "black",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  };

  const footerStyle = {
    height: "80px",
    width: "100%",
    background: "white",
    textAlign: "center",
    lineHeight: "80px",
    fontSize: "18px",
  };

  // Handle login submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/login", { email, password });
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;
        navigate("/home");
      } else {
        alert(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      alert(
        "An error occurred: " +
          (error.response?.data?.detail ||
            "Login failed. Please check your credentials.")
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset
  const handlePasswordReset = async (e) => {
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
    <div style={container}>
      <div style={headerStyle}>
        <form onSubmit={handleSubmit} style={loginFormStyle}>
          <input
            type='email'
            placeholder='Email'
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type='password'
            placeholder='Password'
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button type='submit' style={buttonStyle}>
            {"Sign In"}
          </button>
        </form>
      </div>
      <div style={contentStyle}>
        <div style={Main}>
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
              style={{ ...inputStyle, width: "100%" }} // Full width for better responsiveness
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
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
      <div style={footerStyle}>Footer</div>
    </div>
  );
}

export default Forgot_pass;
