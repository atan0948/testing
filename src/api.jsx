// api.jsx
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Ensure this matches your FastAPI server
});

export default api;