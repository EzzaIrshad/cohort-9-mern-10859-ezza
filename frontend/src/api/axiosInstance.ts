import axios from "axios";

// Axios instance for API calls
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

// TODO: Add interceptors for request and response handling, such as adding authorization headers or handling errors globally.
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