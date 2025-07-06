const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// TODO: Add input validation using express-validator
// TODO: Add rate limiting for authentication endpoints
// TODO: Add password complexity validation
// TODO: Add email verification functionality

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });
};

// TODO: Add refresh token functionality
// const generateRefreshToken = (id) => { ... };

// Register user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, dateOfBirth } = req.body;
        
        // TODO: Add comprehensive input validation
        // TODO: Validate email format, phone format, age requirements
        // TODO: Check password strength requirements
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            });
        }
        
        // TODO: Add email verification step before account activation
        // TODO: Check for banned/blocked email domains
        
        // Create user
        const user = await User.create({
            name,
            email,
            password,
            phone,
            dateOfBirth
        });
        
        // Generate token
        const token = generateToken(user._id);
        
        // TODO: Send welcome email
        // TODO: Log registration event for analytics
        
        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                // TODO: Add more user fields as needed
            }
        });
    } catch (error) {
        // TODO: Add proper error logging
        // TODO: Handle specific mongoose validation errors
        res.status(400).json({
            success: false,
            message: "Registration failed",
            error: error.message
        });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // TODO: Add input validation
        // TODO: Add rate limiting protection against brute force
        // TODO: Add captcha for repeated failed attempts
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        
        // TODO: Check if user account is active/verified
        // TODO: Check if user is banned or suspended
        
        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            // TODO: Log failed login attempt
            // TODO: Implement account lockout after X failed attempts
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        
        // TODO: Update last login timestamp
        // TODO: Log successful login for security monitoring
        
        // Generate token
        const token = generateToken(user._id);
        
        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        // TODO: Extract user from JWT token (need auth middleware)
        // const user = await User.findById(req.user.id).select('-password');
        
        // Temporary implementation without auth middleware
        res.json({
            success: true,
            message: "Profile endpoint - needs auth middleware implementation",
            data: null
        });
        
        // TODO: Return user profile with all relevant fields
        // TODO: Include user preferences, settings, etc.
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get profile",
            error: error.message
        });
    }
};

// Book lesson
exports.bookLesson = async (req, res) => {
    try {
        const { lessonId, date, time, studentInfo } = req.body;
        
        // TODO: Validate booking data
        // TODO: Check lesson availability
        // TODO: Check for booking conflicts
        // TODO: Validate date is not in the past
        
        // TODO: Implement actual booking logic
        // TODO: Update lesson availability
        // TODO: Send confirmation email
        // TODO: Add booking to user's booking history
        
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: {
                bookingId: "temp_id", // TODO: Generate actual booking ID
                lesson: lessonId,
                date,
                time,
                status: "pending"
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Booking failed",
            error: error.message
        });
    }
};

// TODO: Add these additional controller functions:
// exports.updateProfile = async (req, res) => { ... };
// exports.changePassword = async (req, res) => { ... };
// exports.forgotPassword = async (req, res) => { ... };
// exports.resetPassword = async (req, res) => { ... };
// exports.getUserBookings = async (req, res) => { ... };
// exports.cancelBooking = async (req, res) => { ... };
// exports.updateBooking = async (req, res) => { ... };
