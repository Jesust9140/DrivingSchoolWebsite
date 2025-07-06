import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { userAPI, apiCall } from '../utils/api';

// Initial state
const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    error: null,
};

// Action types
const actionTypes = {
    USER_LOADED: 'USER_LOADED',
    AUTH_SUCCESS: 'AUTH_SUCCESS',
    AUTH_ERROR: 'AUTH_ERROR',
    LOGOUT: 'LOGOUT',
    CLEAR_ERROR: 'CLEAR_ERROR',
    SET_LOADING: 'SET_LOADING',
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
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: true,
                loading: false,
                error: null,
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
        default:
            return state;
    }
};

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load user profile
    const loadUser = useCallback(async () => {
        try {
            const result = await apiCall(userAPI.getProfile);
            if (result.success) {
                dispatch({
                    type: actionTypes.USER_LOADED,
                    payload: result.data.data,
                });
            } else {
                dispatch({
                    type: actionTypes.AUTH_ERROR,
                    payload: result.error,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.AUTH_ERROR,
                payload: 'Failed to load user',
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
    }, [state.token, loadUser]); // Added dependencies

    // Register user
    const register = async (userData) => {
        dispatch({ type: actionTypes.SET_LOADING, payload: true });
        try {
            const result = await apiCall(userAPI.register, userData);
            if (result.success) {
                dispatch({
                    type: actionTypes.AUTH_SUCCESS,
                    payload: result.data,
                });
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
            const result = await apiCall(userAPI.login, credentials);
            if (result.success) {
                dispatch({
                    type: actionTypes.AUTH_SUCCESS,
                    payload: result.data,
                });
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
        dispatch({ type: actionTypes.LOGOUT });
    };

    // Clear error
    const clearError = () => {
        dispatch({ type: actionTypes.CLEAR_ERROR });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                register,
                login,
                logout,
                clearError,
                loadUser,
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
