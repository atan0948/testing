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
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Registration successful:", result);
        navigate("/login"); // Navigate to login page after registration
      } else {
        setError(result.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h2
          style={{
            textAlign: "center",
            color: "#000",
            fontSize: "2.25rem",
            marginBottom: "20px",
          }}
        >
          Sign-Up
        </h2>
        {error && (
          <div
            style={{ color: "red", textAlign: "center", marginBottom: "15px" }}
          >
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor='name'
              style={{ fontSize: "1rem", marginBottom: "8px" }}
            >
              <strong>Name</strong>
            </label>
            <input
              type='text'
              id='name'
              placeholder='Enter Name'
              name='name'
              value={values.name}
              onChange={e => setValues({ ...values, name: e.target.value })}
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
              placeholder='Enter Email'
              name='email'
              value={values.email}
              onChange={e => setValues({ ...values, email: e.target.value })}
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
              placeholder='Enter Password'
              name='password'
              value={values.password}
              onChange={e => setValues({ ...values, password: e.target.value })}
              style={inputStyle}
              required
              autoComplete='new-password' // Add the correct autocomplete value for registration
            />
          </div>
          <button type='submit' style={buttonStyle}>
            Sign Up
          </button>
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            You agree to our{" "}
            <a href='/terms' style={{ color: "#007bff" }}>
              terms and policies
            </a>
          </p>
        </form>
        <Link to='/' style={linkButtonStyle}>
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
