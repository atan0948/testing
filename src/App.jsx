import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Forgot_pass from "./Forgot_pass";
import AdminDash from "./Admin/AdminDash";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/ForgetPassword' element={<Forgot_pass />} />
        <Route path='/admin' element={<AdminDash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
