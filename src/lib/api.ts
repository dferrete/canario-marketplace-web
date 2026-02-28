import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to attach JWT token if available
api.interceptors.request.use(
    (config) => {
        // We will retrieve the token from localStorage or cookies later
        // const token = localStorage.getItem("token");
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle common errors (like 401 Unauthorized)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle global errors here
        if (error.response && error.response.status === 401) {
            // Redirect to login or refresh token
            console.warn("Unauthorized access - maybe redirect to login?");
        }
        return Promise.reject(error);
    }
);

export default api;
