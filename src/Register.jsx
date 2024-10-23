import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api'; // Ensure this is the correct path to your API setup

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    height: '100vh',
    width: '100vw',
    margin: '0',
};

const formContainerStyle = {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
};

const inputStyle = {
    marginBottom: '18px',
    padding: '14px',
    borderRadius: '5px',
    width: '100%',
    border: '1px solid #ccc',
    fontSize: '16px',
};

const buttonStyle = {
    padding: '14px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    width: '100%',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

const linkButtonStyle = {
    textAlign: 'center',
    padding: '12px 0',
    marginTop: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f8f9fa',
    textDecoration: 'none',
    color: '#007bff',
    width: '100%',
    display: 'inline-block',
};

const Register = () => {
    const [values, setValues] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await api.post('/register/', values);
            if (response.data) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/');
                }, 2000); // Redirect after 2 seconds
            }
        } catch (err) {
            console.error('Registration error:', err);
            if (err.response && err.response.data) {
                const errorMsg = err.response.data.detail || err.response.data.msg || 'Registration failed. Please check your input.';
                setError(errorMsg);
            } else {
                setError('An unexpected error occurred: ' + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={containerStyle}>
            <div style={formContainerStyle}>
                <h2 style={{ textAlign: 'center', color: '#000', fontSize: '2.25rem', marginBottom: '20px' }}>
                    Sign-Up
                </h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" style={{ fontSize: '1rem', marginBottom: '8px' }}><strong>Username</strong></label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter Username"
                            name="username"
                            value={values.username}
                            onChange={e => setValues({ ...values, username: e.target.value })}
                            style={inputStyle}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" style={{ fontSize: '1rem', marginBottom: '8px' }}><strong>Email</strong></label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            name="email"
                            value={values.email}
                            onChange={e => setValues({ ...values, email: e.target.value })}
                            style={inputStyle}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" style={{ fontSize: '1rem', marginBottom: '8px' }}><strong>Password</strong></label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            name="password"
                            value={values.password}
                            onChange={e => setValues({ ...values, password: e.target.value })}
                            style={inputStyle}
                            required
                        />
                    </div>
                    <button type="submit" style={buttonStyle} disabled={loading}>
                        {loading ? 'Registering...' : 'Sign Up'}
                    </button>
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    {success && <p style={{ color: 'green', textAlign: 'center' }}>Registration successful! Redirecting...</p>}
                    <p style={{ textAlign: 'center', marginTop: '10px' }}>You agree to our terms and policies</p>
                </form>
                <Link to="/" style={linkButtonStyle}>
                    Go to Login
                </Link>
            </div>
        </div>
    );
};

export default Register;
