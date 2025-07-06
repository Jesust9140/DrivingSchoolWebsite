import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { userAPI, apiCall } from '../utils/api';

// TODO: Consider adding user preferences to state (theme, language, etc.)
// TODO: Add session timeout handling
// TODO: Implement refresh token functionality for better security

// Initial state
const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    error: null,
    // TODO: Add these fields later:
    // preferences: { theme: 'light', language: 'en' },
    // lastActivity: null,
    // sessionExpiry: null,
};

// Action types
const actionTypes = {
    USER_LOADED: 'USER_LOADED',
    AUTH_SUCCESS: 'AUTH_SUCCESS',
    AUTH_ERROR: 'AUTH_ERROR',
    LOGOUT: 'LOGOUT',
    CLEAR_ERROR: 'CLEAR_ERROR',
    SET_LOADING: 'SET_LOADING',
    // TODO: Add these action types:
    // UPDATE_PROFILE: 'UPDATE_PROFILE',
    // UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
    // SESSION_EXPIRED: 'SESSION_EXPIRED',
};

// Reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
                error: null,
            };
        case actionTypes.AUTH_SUCCESS:
            // TODO: Consider storing token in httpOnly cookie for better security
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: true,
                loading: false,
                error: null,
                // TODO: Set session expiry time
            };
        case actionTypes.AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                loading: false,
                error: action.payload,
            };
        case actionTypes.LOGOUT:
            localStorage.removeItem('token');
            // TODO: Also clear any other user-related data from localStorage
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                loading: false,
                error: null,
            };
        case actionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        case actionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        // TODO: Add cases for UPDATE_PROFILE, UPDATE_PREFERENCES, SESSION_EXPIRED
        default:
            return state;
    }
};

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // TODO: Add automatic session timeout check
    // TODO: Add heartbeat to keep session alive during active use

    // Load user profile
    const loadUser = useCallback(async () => {
        try {
            // TODO: Add retry logic for network failures
            const result = await apiCall(userAPI.getProfile);
            if (result.success) {
                dispatch({
                    type: actionTypes.USER_LOADED,
                    payload: result.data.data,
                });
            } else {
                // TODO: Handle different error types (network, auth, server)
                dispatch({
                    type: actionTypes.AUTH_ERROR,
                    payload: result.error,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.AUTH_ERROR,
                payload: 'Failed to load user profile',
            });
        }
    }, []);

    // Load user on app start if token exists
    useEffect(() => {
        if (state.token) {
            loadUser();
        } else {
            dispatch({ type: actionTypes.SET_LOADING, payload: false });
        }
    }, [state.token, loadUser]);

    // TODO: Add useEffect for session timeout monitoring

    // Register user
    const register = async (userData) => {
        dispatch({ type: actionTypes.SET_LOADING, payload: true });
        try {
            // TODO: Add client-side validation before API call
            // TODO: Add password strength validation
            const result = await apiCall(userAPI.register, userData);
            if (result.success) {
                dispatch({
                    type: actionTypes.AUTH_SUCCESS,
                    payload: result.data,
                });
                // TODO: Send welcome email or show onboarding
                return { success: true };
            } else {
                dispatch({
                    type: actionTypes.AUTH_ERROR,
                    payload: result.error,
                });
                return { success: false, error: result.error };
            }
        } catch (error) {
            dispatch({
                type: actionTypes.AUTH_ERROR,
                payload: 'Registration failed',
            });
            return { success: false, error: 'Registration failed' };
        }
    };

    // Login user
    const login = async (credentials) => {
        dispatch({ type: actionTypes.SET_LOADING, payload: true });
        try {
            // TODO: Add remember me functionality
            // TODO: Add rate limiting protection
            const result = await apiCall(userAPI.login, credentials);
            if (result.success) {
                dispatch({
                    type: actionTypes.AUTH_SUCCESS,
                    payload: result.data,
                });
                // TODO: Log login activity for security monitoring
                return { success: true };
            } else {
                dispatch({
                    type: actionTypes.AUTH_ERROR,
                    payload: result.error,
                });
                return { success: false, error: result.error };
            }
        } catch (error) {
            dispatch({
                type: actionTypes.AUTH_ERROR,
                payload: 'Login failed',
            });
            return { success: false, error: 'Login failed' };
        }
    };

    // Logout user
    const logout = () => {
        // TODO: Call logout API endpoint to invalidate server-side session
        // TODO: Add logout confirmation for unsaved changes
        dispatch({ type: actionTypes.LOGOUT });
    };

    // Clear error
    const clearError = () => {
        dispatch({ type: actionTypes.CLEAR_ERROR });
    };

    // TODO: Add these functions:
    // const updateProfile = async (profileData) => { ... };
    // const changePassword = async (passwordData) => { ... };
    // const updatePreferences = (preferences) => { ... };
    // const checkSessionExpiry = () => { ... };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                register,
                login,
                logout,
                clearError,
                loadUser,
                // TODO: Add new functions when implemented:
                // updateProfile,
                // changePassword,
                // updatePreferences,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
