import axios from "axios";

// Automatically detect environment and use appropriate API URL
const getApiUrl = () => {
    const url = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
    // Ensure the URL always ends with /api for consistency
    return url.endsWith("/api") ? url : `${url.trim().replace(/\/$/, "")}/api`;
};

export const axiosInstance = axios.create({
    baseURL: getApiUrl(),
    withCredentials: true, // Include cookies in requests
})