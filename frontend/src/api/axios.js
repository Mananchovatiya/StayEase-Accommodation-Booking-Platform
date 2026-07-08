import axios from "axios";

// All requests go to /api (proxied to the Express backend on port 8080).
// withCredentials keeps the session cookie so login persists.
const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

export default api;
