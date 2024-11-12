import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

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

const loginFormStyle = {
  display: "flex",
  alignItems: "center",
  marginLeft: "auto", // Pushes the form to the right
  flexWrap: "wrap", // Ensures elements wrap on smaller screens
};

const LoginSmall = ({ loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
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
          (error.response?.data?.detail || "Login failed.")
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} style={loginFormStyle}>
      <input
        type='email'
        placeholder='Email'
        style={inputStyle}
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        disabled={loading}
      />
      <input
        type='password'
        placeholder='Password'
        style={inputStyle}
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        disabled={loading}
      />
      <button type='submit' style={buttonStyle} disabled={loading}>
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};

export default LoginSmall;
