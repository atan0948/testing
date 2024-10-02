import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from './api'; // Import the Axios instance

function Register() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!values.name || !values.email || !values.password) {
            alert('All fields are required');
            return;
        }

        try {   
            const response = await api.post('/register', {
                username: values.name,
                email: values.email,
                password: values.password,
            });
            alert(response.data.message); // Show success message in alert
        } catch (err) {
            if (err.response) {
                // Handle specific error responses
                if (err.response.data.message.includes('Username already taken')) {
                    alert('Username already taken. Please choose another one.');
                } else if (err.response.data.message.includes('Email already registered')) {
                    alert('Email already registered. Please choose another one.');
                } else {
                    alert(err.response.data.message || 'Registration failed');
                }
            } else {
                alert('Registration failed. Please try again later.'); // Network or unexpected errors
            }
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder='Enter Name' 
                            name='name'
                            onChange={e => setValues({...values, name: e.target.value})} 
                            className='form-control rounded-0'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder='Enter Email' 
                            name='email'
                            onChange={e => setValues({...values, email: e.target.value})} 
                            className='form-control rounded-0'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder='Enter Password' 
                            name='password'
                            onChange={e => setValues({...values, password: e.target.value})} 
                            className='form-control rounded-0'
                        />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
                    <p>You agree to our terms and policies</p>
                    <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
                        Go to Login
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Register;
