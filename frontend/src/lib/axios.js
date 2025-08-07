import axios from "axios";

// Automatically detect environment and use appropriate API URL
const getApiUrl = () => {
    // In production (deployed), use production backend
    if (import.meta.env.PROD) {
        return "https://task-tracker-backend-9t12.onrender.com/api";
    }
    // In development, use local backend or environment variable
    return import.meta.env.VITE_API_URL || "http://localhost:5001/api";
};

export const axiosInstance = axios.create({
    baseURL: getApiUrl(),
    withCredentials: true, // Include cookies in requests
})