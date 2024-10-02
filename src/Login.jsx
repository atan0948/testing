import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password,
            });

            if (response.data.message === 'Login successful!') {
                console.log('Login successful:', email); // Console log for successful login
                navigate('/home'); // Redirect to the Home component path
            } else {
                alert(response.data.message); // Show any other messages
            }

        } catch (error) {
            if (error.response) {
                // If the response has a specific message, show it
                alert(error.response.data.message); // Show error message from backend
            } else {
                alert('An error occurred. Please try again.'); // General error message
            }
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-In</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder='Enter Email' 
                            className='form-control rounded-0'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                            autoComplete="email" 
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder='Enter Password' 
                            className='form-control rounded-0'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                            autoComplete="current-password" 
                        />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Sign In</button>
                    <p>You agree to our terms and policies</p>
                    <Link to="/register" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
                        Create Account
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
