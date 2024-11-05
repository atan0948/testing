import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./api"; // Ensure this is the correct path to your API setup

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f8f9fa",
  height: "100vh",
  width: "100vw",
  margin: "0",
  padding: "20px", // Padding to prevent content from touching edges
  boxSizing: "border-box", // Include padding in total width/height
};

const formContainerStyle = {
  backgroundColor: "#fff",
  padding: "40px",
  borderRadius: "8px",
  width: "100%", // Use full width
  maxWidth: "400px", // Maximum width for the form
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
};

const inputStyle = {
  marginBottom: "18px",
  padding: "14px",
  borderRadius: "5px",
  width: "100%", // Ensure inputs take full width
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "14px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  width: "100%", // Button takes full width
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const lineContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "1rem",
  width: "100%", // Ensure this takes full width
};

const hrStyle = {
  flex: 1,
  border: "1px solid #ccc",
  margin: "0 10px", // Adjust horizontal margins for equal spacing
};

const signUpLinkStyle = {
  textAlign: "center",
  padding: "12px 0",
  marginTop: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#f8f9fa",
  textDecoration: "none",
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/login", { email, password });
      console.log("Response:", response.data);

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
      console.error("Login error:", error);
      if (error.response) {
        alert(
          error.response.data.detail ||
            "Login failed. Please check your credentials."
        );
      } else if (error.request) {
        alert(
          "No response from the server. Please check your network connection."
        );
      } else {
        alert("An error occurred: " + error.message);
      }
    } finally {
      setLoading(false);
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
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor='email'
              className='block text-lg font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              style={inputStyle}
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-lg font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              style={inputStyle}
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <div className='text-right text-xs text-red-500 mt-2'>
              <Link to='/ForgetPassword'>Forgot password?</Link>
            </div>
          </div>
          <button type='submit' style={buttonStyle} disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div style={lineContainerStyle}>
          <hr style={hrStyle} />
          <Link
            to='/register'
            className='text-blue-500 font-medium hover:underline'
            style={signUpLinkStyle}
          >
            Sign Up
          </Link>
          <hr style={hrStyle} />
        </div>
      </div>
    </div>
  );
};

export default Login;
