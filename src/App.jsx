import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Forgot_pass from "./Forgot_pass";
import AdminDash from "./Admin/AdminDash"; // Correct path
import PrivateRoute from "./PrivateRoute"; // Import the PrivateRoute component

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Keep track of authentication state

  // Toggle dark mode function
  const toggleMode = () => setIsDarkMode(!isDarkMode);

  // Mock authentication check (you can replace this with your actual logic)
  const checkAuthentication = () => {
    // For example, check if the token exists in localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // If a token exists, the user is authenticated
  };

  // Call checkAuthentication when the app loads
  React.useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Route for Home */}
        <Route
          path='/home'
          element={
            <PrivateRoute
              element={<Home isDarkMode={isDarkMode} toggleMode={toggleMode} />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        {/* Login Route (accessible to everyone) */}
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/ForgetPassword' element={<Forgot_pass />} />

        {/* Protected Route for Admin Dashboard */}
        <Route
          path='/admin'
          element={
            <PrivateRoute
              element={
                <AdminDash isDarkMode={isDarkMode} toggleMode={toggleMode} />
              }
              isAuthenticated={isAuthenticated}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
