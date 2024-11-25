import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const containerStyle = {
  display: "grid",
  placeItems: "center",
  backgroundColor: "#f8f9fa",
  height: "100vh",
  width: "100vw",
  margin: "0",
  padding: "20px",
  boxSizing: "border-box",
};

const formContainerStyle = {
  backgroundColor: "#fff",
  padding: "40px",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "400px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
};

const inputStyle = {
  marginBottom: "18px",
  padding: "14px",
  borderRadius: "5px",
  width: "100%",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "14px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  width: "100%",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const linkButtonStyle = {
  textAlign: "center",
  padding: "12px 0",
  marginTop: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#f8f9fa",
  textDecoration: "none",
  color: "#007bff",
  width: "100%",
  display: "inline-block",
};

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [passwordWarning, setPasswordWarning] = useState(null); // To hold password warning
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset error state
    setPasswordWarning(null); // Reset password warning state

    // Check if password is too short
    if (values.password.length < 6) {
      setPasswordWarning(
        "Your password is too short. It is recommended to use a stronger password."
      );
    }

    try {
      const response = await fetch("http://172.22.30.136:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/login"); // Navigate to login page after registration
      } else {
        setError(result.detail || "An error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Sign-Up</h2>
        {error && (
          <div
            style={{ color: "red", textAlign: "center", marginBottom: "15px" }}
          >
            {error}
          </div>
        )}
        {passwordWarning && (
          <div
            style={{
              color: "orange",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            {passwordWarning}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor='username'
              style={{ fontSize: "1rem", marginBottom: "8px" }}
            >
              <strong>Username</strong>
            </label>
            <input
              type='text'
              id='username'
              name='username'
              value={values.username}
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label
              htmlFor='email'
              style={{ fontSize: "1rem", marginBottom: "8px" }}
            >
              <strong>Email</strong>
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label
              htmlFor='password'
              style={{ fontSize: "1rem", marginBottom: "8px" }}
            >
              <strong>Password</strong>
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              style={inputStyle}
              required
            />
          </div>
          <button type='submit' style={buttonStyle}>
            Sign Up
          </button>
        </form>
        <Link to='/login' style={linkButtonStyle}>
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
