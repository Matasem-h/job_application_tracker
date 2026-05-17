// This file handles all HTTP requests to the backend API
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Creating an axios instance using the base URL
const api = axios.create({
    baseURL: API_URL
});

// Automatically attaching the JWT token to every request if it is found
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth endpoints
export const register = (email, password) => api.post("/auth/register", {email, password});

export const login = (email, password) => api.post("/auth/login", {email, password});

// Application endpoints
export const getApplications = () => api.get(`/applications`);
export const getApplicationById = (id) => api.get(`/applications/${id}`);
export const createApplication = (data) => api.post("/applications", data);
export const updateApplication = (id, data) => api.put(`/applications/${id}`, data);
export const deleteApplication = (id) => api.delete(`/applications/${id}`)
export const getStats = () => api.get("/applications/stats")

export default api;


