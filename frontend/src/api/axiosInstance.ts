import axios from "axios";

// Axios instance for API calls
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000
})

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);