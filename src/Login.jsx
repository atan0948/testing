import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api'; // Ensure this is the correct path to your API setup

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Start loading

        try {
            // Adjust the payload if necessary based on your FastAPI expectations
            const response = await api.post('http://127.0.0.1:5002/login', { email, password }); // Ensure this matches the backend
            console.log('Response:', response.data);

            if (response.data.access_token) {
                localStorage.setItem('token', response.data.access_token);
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
                navigate('/home'); // Redirect to home on successful login
            } else {
                alert(response.data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response) {
                alert(error.response.data.detail || 'Login failed. Please check your credentials.');
            } else if (error.request) {
                alert('No response from the server. Please check your network connection.');
            } else {
                alert('An error occurred: ' + error.message);
            }
        } finally {
            setLoading(false); // Stop loading
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
                    <button type='submit' className='btn btn-success w-100 rounded-0' disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
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
