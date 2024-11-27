import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./api"; // Ensure this is the correct path to your API setup

// Styles for the entire container that holds the form
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f8f9fa", // Light background color
  height: "100vh", // Full viewport height
  width: "100vw", // Full viewport width
  margin: "0", // Remove default margin
  padding: "20px", // Padding around the container
  boxSizing: "border-box", // Ensures padding doesn't affect the overall width/height
};

// Styles for the form container
const formContainerStyle = {
  backgroundColor: "#fff", // White background for the form
  padding: "40px", // Padding inside the form
  borderRadius: "8px", // Rounded corners for the form container
  width: "100%", // Full width for the form
  maxWidth: "400px", // Maximum width for the form (400px)
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // Drop shadow for better visibility
  display: "flex",
  flexDirection: "column", // Stack form elements vertically
  alignItems: "stretch", // Stretch form elements to the container's width
};

// Styles for the input fields (email and password)
const inputStyle = {
  marginBottom: "18px", // Space between input fields
  padding: "14px", // Padding inside input fields
  borderRadius: "5px", // Rounded corners for inputs
  width: "100%", // Full width for inputs
  border: "1px solid #ccc", // Border around input fields
  fontSize: "16px", // Font size for input text
};

// Styles for the submit button
const buttonStyle = {
  padding: "14px", // Padding inside the button
  backgroundColor: "#007bff", // Blue background color for the button
  color: "#fff", // White text color for the button
  border: "none", // Remove default border
  borderRadius: "5px", // Rounded corners for the button
  width: "100%", // Full width for the button
  cursor: "pointer", // Change cursor to pointer on hover
  transition: "background-color 0.3s", // Smooth transition for background color change
};

// Styles for the line and 'Sign Up' link container
const lineContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "1rem", // Margin above the line container
  width: "100%", // Full width for the container
};

// Styles for the horizontal line inside the container
const hrStyle = {
  flex: 1, // Allow the lines to stretch and take up available space
  border: "1px solid #ccc", // Light grey border for the lines
  margin: "0 10px", // Space between the lines and the 'Sign Up' link
};

// Styles for the 'Sign Up' link button
const signUpLinkStyle = {
  textAlign: "center", // Center the text in the 'Sign Up' link
  padding: "12px 0", // Padding around the link
  marginTop: "20px", // Margin above the link
  border: "1px solid #ccc", // Border around the 'Sign Up' link
  borderRadius: "5px", // Rounded corners for the 'Sign Up' link
  backgroundColor: "#f8f9fa", // Light background color for the link
  textDecoration: "none", // Remove underline from the link
};

// Login component
const Login = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [loading, setLoading] = useState(false); // State to track loading status
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate(); // Hook to navigate to different pages

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true to disable form
    setErrorMessage(""); // Clear any previous error message

    try {
      // Make the login API request
      const response = await api.post("/login", { email, password });
      if (response.data.access_token) {
        // If successful, store the token and set up authentication
        localStorage.setItem("token", response.data.access_token);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;
        navigate("/admin"); // Redirect to admin page after successful login
      } else {
        setErrorMessage(
          response.data.message || "Login failed. Please try again."
        ); // Display error message if no access token is returned
      }
    } catch (error) {
      console.error("Login error:", error); // Log any errors for debugging
      if (error.response) {
        setErrorMessage(error.response.data.detail || "Login failed."); // Display error message from server
      } else if (error.request) {
        setErrorMessage(
          "No response from the server. Please check your network."
        ); // Display error if no response from server
      } else {
        setErrorMessage("An error occurred: " + error.message); // Display generic error message
      }
    } finally {
      setLoading(false); // Set loading state to false after request is complete
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h2
          style={{
            textAlign: "center", // Center the title
            color: "#000", // Black text color for the title
            fontSize: "2.25rem", // Title font size
            marginBottom: "20px", // Margin below the title
          }}
        >
          Sign In
        </h2>
        {errorMessage && (
          // Conditionally render error message if it exists
          <div
            style={{ color: "red", textAlign: "center", marginBottom: "15px" }}
          >
            {errorMessage}
          </div>
        )}
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
              style={inputStyle} // Apply input styles
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required // Make the input field required
              disabled={loading} // Disable input when loading
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
              style={inputStyle} // Apply input styles
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required // Make the input field required
              disabled={loading} // Disable input when loading
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
          <Link to='/register' style={signUpLinkStyle}>
            Sign Up
          </Link>
          <hr style={hrStyle} />
        </div>
      </div>
    </div>
  );
};

export default Login;
