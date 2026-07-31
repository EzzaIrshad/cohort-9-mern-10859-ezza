# React + TypeScript + Vite

## Environment variables

The frontend expects a Vite environment variable named `VITE_API_URL` for the Axios API base URL. It is recommended for API calls to a backend running on a different host or port, and should be set to a value such as `http://localhost:5000/api`.

If `VITE_API_URL` is not set, Axios will use a relative base URL, so requests will target the current origin instead of a separate API server.