import axios from "axios";

// TODO: Add request/response interceptors for better error handling
// TODO: Implement automatic retry logic for failed requests
// TODO: Add request timeout configuration
// TODO: Consider using React Query or SWR for better caching and state management

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    // TODO: Add timeout configuration
    timeout: 10000, // 10 seconds
});

// Add auth token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // TODO: Add request ID for tracking
        // TODO: Add API version header
        return config;
    },
    (error) => {
        // TODO: Log request errors for debugging
        return Promise.reject(error);
    }
);

// TODO: Add response interceptor for handling common errors
api.interceptors.response.use(
    (response) => {
        // TODO: Add response logging in development mode
        return response;
    },
    (error) => {
        // TODO: Handle different error types (network, auth, server)
        // TODO: Implement automatic token refresh on 401 errors
        // TODO: Show user-friendly error messages
        if (error.response?.status === 401) {
            // TODO: Redirect to login page or refresh token
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

// Lesson API calls
export const lessonAPI = {
    // Get all lessons
    getLessons: () => api.get("/lessons"),
    
    // Get single lesson
    getLesson: (id) => api.get(`/lessons/${id}`),
    
    // TODO: Add pagination support for lessons
    // getLessonsWithPagination: (page, limit) => api.get(`/lessons?page=${page}&limit=${limit}`),
    
    // TODO: Add lesson filtering and search
    // searchLessons: (query) => api.get(`/lessons/search?q=${query}`),
    // filterLessons: (filters) => api.get("/lessons", { params: filters }),
    
    // Create lesson (admin only)
    createLesson: (lessonData) => api.post("/lessons", lessonData),
    
    // Update lesson (admin only)
    updateLesson: (id, lessonData) => api.put(`/lessons/${id}`, lessonData),
    
    // Delete lesson (admin only)
    deleteLesson: (id) => api.delete(`/lessons/${id}`),
    
    // TODO: Add lesson availability endpoints
    // getAvailableSlots: (lessonId, date) => api.get(`/lessons/${lessonId}/availability?date=${date}`),
    // updateAvailability: (lessonId, availability) => api.put(`/lessons/${lessonId}/availability`, availability),
};

// User API calls
export const userAPI = {
    // Register user
    register: (userData) => api.post("/users/register", userData),
    
    // Login user
    login: (credentials) => api.post("/users/login", credentials),
    
    // Get user profile
    getProfile: () => api.get("/users/profile"),
    
    // TODO: Add profile update functionality
    // updateProfile: (profileData) => api.put("/users/profile", profileData),
    
    // TODO: Add password change functionality
    // changePassword: (passwordData) => api.put("/users/change-password", passwordData),
    
    // Book lesson
    bookLesson: (bookingData) => api.post("/users/book", bookingData),
    
    // TODO: Add booking management endpoints
    // getBookings: () => api.get("/users/bookings"),
    // updateBooking: (bookingId, updates) => api.put(`/users/bookings/${bookingId}`, updates),
    // cancelBooking: (bookingId) => api.delete(`/users/bookings/${bookingId}`),
    
    // TODO: Add user preferences endpoints
    // getPreferences: () => api.get("/users/preferences"),
    // updatePreferences: (preferences) => api.put("/users/preferences", preferences),
};

// TODO: Add instructor API calls for instructor features
export const instructorAPI = {
    // TODO: Implement when instructor features are added
    // getSchedule: () => api.get("/instructor/schedule"),
    // updateAvailability: (availability) => api.put("/instructor/availability", availability),
    // getStudents: () => api.get("/instructor/students"),
    // updateLessonStatus: (lessonId, status) => api.put(`/instructor/lessons/${lessonId}/status`, { status }),
};

// TODO: Add admin API calls for admin panel
export const adminAPI = {
    // TODO: Implement when admin panel is added
    // getUsers: (page, limit) => api.get(`/admin/users?page=${page}&limit=${limit}`),
    // updateUser: (userId, updates) => api.put(`/admin/users/${userId}`, updates),
    // getBookings: (filters) => api.get("/admin/bookings", { params: filters }),
    // getAnalytics: (dateRange) => api.get(`/admin/analytics?from=${dateRange.from}&to=${dateRange.to}`),
    // getSystemStats: () => api.get("/admin/stats"),
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
        // TODO: Add more specific error handling based on error type
        // TODO: Log errors for debugging in development mode
        console.error('API Call Error:', error);
        
        return {
            success: false,
            error: error.response?.data?.message || error.message || 'An unexpected error occurred',
            status: error.response?.status,
        };
    }
};

// TODO: Add utility functions for common API patterns
// export const uploadFile = async (file, endpoint) => { ... };
// export const downloadFile = async (fileId) => { ... };
// export const checkApiHealth = async () => { ... };

export default api;
