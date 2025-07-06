import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add auth token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Lesson API calls
export const lessonAPI = {
    // Get all lessons
    getLessons: () => api.get("/lessons"),
    
    // Get single lesson
    getLesson: (id) => api.get(`/lessons/${id}`),
    
    // Create lesson (admin only)
    createLesson: (lessonData) => api.post("/lessons", lessonData),
    
    // Update lesson (admin only)
    updateLesson: (id, lessonData) => api.put(`/lessons/${id}`, lessonData),
    
    // Delete lesson (admin only)
    deleteLesson: (id) => api.delete(`/lessons/${id}`),
};

// User API calls
export const userAPI = {
    // Register user
    register: (userData) => api.post("/users/register", userData),
    
    // Login user
    login: (credentials) => api.post("/users/login", credentials),
    
    // Get user profile
    getProfile: () => api.get("/users/profile"),
    
    // Book lesson
    bookLesson: (bookingData) => api.post("/users/book", bookingData),
};

// General API call function
export const apiCall = async (apiFunction, ...args) => {
    try {
        const response = await apiFunction(...args);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || error.message,
        };
    }
};

export default api;
