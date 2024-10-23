import React, { useState } from 'react';

function Home() {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        margin: '0',
        backgroundColor: '#f8f9fa',
    };

    const formStyle = {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '400px',
    };

    const inputStyle = {
        marginBottom: '15px',
        padding: '10px',
        borderRadius: '5px',
        width: '100%',
        border: '1px solid #ccc',
    };

    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
        transition: 'background-color 0.3s',
    };
    // Success color
    const messageStyle = {
        marginTop: '10px',
        textAlign: 'center',
        color: '#28a745',
    };
    // Error color
    const errorStyle = {
        marginTop: '10px',
        textAlign: 'center',
        color: '#dc3545', 
    };

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const blockedFileTypes = ['.html', '.htm', '.zip', '.rar', '.7z', '.txt', '.gif'];

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const fileName = selectedFile.name;
            const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();

            if (blockedFileTypes.includes(`.${fileExtension}`)) {
                setError(`This file type is not allowed: ${fileExtension.toUpperCase()}`);
                setFile(null);
                setMessage('');
                return;
            }

            setFile(selectedFile);
            setError('');
            setMessage('File selected: ' + selectedFile.name);
        }
    };

    const handleFileUpload = async () => {
        if (!file) {
            setMessage('');
            setError('Please select a file first.');
            return;
        }

        setUploading(true);
        setMessage('Uploading...');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/home', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token if needed
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.detail || 'File upload failed.');
                setMessage('');
            } else {
                const data = await response.json();
                setMessage('File uploaded successfully: ' + data.filename);
                setFile(null); // Clear the file after successful upload
                setError('');
            }
        } catch (err) {
            console.error('Upload error:', err);
            setError('An error occurred during file upload. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={containerStyle}>
            <div style={formStyle}>
                <h2 style={{ textAlign: 'center', color: '#000', fontSize: '2.25rem', marginBottom: '20px' }}>
                    File Upload
                </h2>
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={inputStyle}
                />
                <button
                    onClick={handleFileUpload}
                    style={buttonStyle}
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : 'Upload File'}
                </button>
                {message && <p style={messageStyle}>{message}</p>}
                {error && <p style={errorStyle}>{error}</p>}
            </div>
        </div>
    );
}

export default Home;
