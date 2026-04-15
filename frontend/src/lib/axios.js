import axios from "axios";

// Automatically detect environment and use appropriate API URL
const getApiUrl = () => {
    // Priority: Environment Variable -> Default Localhost
    return import.meta.env.VITE_API_URL || "http://localhost:5001/api";
};

export const axiosInstance = axios.create({
    baseURL: getApiUrl(),
    withCredentials: true, // Include cookies in requests
})