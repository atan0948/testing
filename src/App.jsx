import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} /> {/* Show Login on root path */}
        <Route path='/home' element={<Home />} /> {/* Show Home on '/home' */}
        <Route path="/register" element={<Register />} /> {/* Register component */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
