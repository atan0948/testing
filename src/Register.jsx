import React, { useState } from "react";
import { Link } from "react-router-dom";

const containerStyle = {
  display: "grid",
  placeItems: "center",
  backgroundColor: "#f8f9fa",
  height: "100vh",
  width: "100vw",
  margin: "0",
  padding: "20px", // Add some padding for smaller screens
  boxSizing: "border-box",
};

const formContainerStyle = {
  backgroundColor: "#fff",
  padding: "40px",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "400px", // Max width for larger screens
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values); // For example, log values to console
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
              onChange={(e) => setValues({ ...values, name: e.target.value })}
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
              placeholder='Enter Password'
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
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            You agree to our terms and policies
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
