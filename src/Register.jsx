import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api'; // Import the Axios instance

function Register() {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate(); // Hook to programmatically navigate after successful registration

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate inputs
        if (!values.username || !values.email || !values.password) {
            alert('All fields are required');
            return;
        }

        try {
            const response = await api.post('/register', {
                username: values.username,
                email: values.email,
                password: values.password,
            });
            alert(response.data.message); // Show success message in alert
            navigate('/'); // Redirect to login after successful registration
        } catch (err) {
            if (err.response) {
                // Handle specific error responses
                const detail = err.response.data.detail;
                if (detail) {
                    if (detail.includes('Username already taken')) {
                        alert('Username already taken. Please choose another one.');
                    } else if (detail.includes('Email already taken')) {
                        alert('Email already taken. Please choose another one.');
                    } else {
                        alert(detail || 'Registration failed. Please try again.');
                    }
                } else {
                    alert('Registration failed. Please try again.');
                }
            } else {
                alert('Registration failed. Please check your network connection and try again.'); // Handle network errors
            }
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="username"><strong>Username</strong></label>
                        <input 
                            type="text" 
                            id="username" 
                            placeholder='Enter Username' 
                            name='username'
                            value={values.username}
                            onChange={e => setValues({...values, username: e.target.value})} 
                            className='form-control rounded-0'
                            required // Make the field required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder='Enter Email' 
                            name='email'
                            value={values.email}
                            onChange={e => setValues({...values, email: e.target.value})} 
                            className='form-control rounded-0'
                            required // Make the field required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder='Enter Password' 
                            name='password'
                            value={values.password}
                            onChange={e => setValues({...values, password: e.target.value})} 
                            className='form-control rounded-0'
                            required // Make the field required
                        />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
                    <p>You agree to our terms and policies</p>
                    <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
                        Go to Login
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Register;
