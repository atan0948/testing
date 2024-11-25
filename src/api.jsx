// api.jsx
import axios from "axios";

const api = axios.create({
  baseURL: "http://172.22.30.136:8000", // Updated to the correct backend server IP
});

export default api;
