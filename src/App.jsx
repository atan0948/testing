import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Forgot_pass from "./Forgot_pass";
import AdminDash from "./Admin/AdminDash"; // Correct path
import Sidebar from "./Admin/Sidebar"; // Correct path

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode function
  const toggleMode = () => setIsDarkMode(!isDarkMode);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/home'
          element={<Home isDarkMode={isDarkMode} toggleMode={toggleMode} />}
        />
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/ForgetPassword' element={<Forgot_pass />} />

        {/* Pass isDarkMode and toggleMode to AdminDash */}
        <Route
          path='/admin'
          element={
            <AdminDash isDarkMode={isDarkMode} toggleMode={toggleMode} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
