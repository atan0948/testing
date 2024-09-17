// app.js
const mysql = require('mysql2');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create an Express app
const app = express();

// Set up MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'J@yVeeN@thanael1234',
    database: 'nodejs' // Your database name
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        // Optionally, handle reconnection logic or exit the process
    } else {
        console.log('Connected to the database as ID:', connection.threadId);
    }
});

// Set up Multer for file upload handling
const upload = multer({ 
    dest: 'uploads/', // Directory to temporarily store uploaded files
    fileFilter: (req, file, cb) => {
        // Only allow certain file types
        const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
                               'application/vnd.ms-excel', 'application/pdf'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    }
});

// Serve static files from the 'uploads' directory
app.use(express.static('uploads'));

// Route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const { originalname, path: tempPath, size } = req.file;
    const userId = req.body.user_id; // Make sure this field is sent with the form

    // Move the file to a permanent location
    const newFilePath = path.join('uploads', originalname);
    fs.rename(tempPath, newFilePath, (err) => {
        if (err) {
            return res.status(500).send('Error moving file.');
        }

        // Save file information to the database
        const query = 'INSERT INTO fileuploads (file_name, file_path, file_size, user_id) VALUES (?, ?, ?, ?)';
        connection.query(query, [originalname, newFilePath, size, userId], (error) => {
            if (error) {
                return res.status(500).send('Error saving file information.');
            }
            res.send('File uploaded and information saved.');
        });
    });
});

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Ensure the file exists
});

// Set the port and start the server
app.listen(4530, () => {
    console.log('Server is running on port 4530');
});
