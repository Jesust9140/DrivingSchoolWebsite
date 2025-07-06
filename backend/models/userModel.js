const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// TODO: Add user preferences schema
// TODO: Add user activity tracking fields
// TODO: Add profile picture/avatar field
// TODO: Consider adding user verification status

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        // TODO: Add min/max length validation
        // TODO: Add name format validation (no numbers, special chars)
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        // TODO: Add email format validation
        // TODO: Add email verification status field
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        // TODO: Add password complexity requirements
        // TODO: Add password history to prevent reuse
    },
    phone: {
        type: String,
        required: true,
        // TODO: Add phone number format validation
        // TODO: Add phone verification status
    },
    dateOfBirth: {
        type: Date,
        // TODO: Add age validation (minimum age for driving)
        // TODO: Make this required for students
    },
    licenseNumber: {
        type: String,
        // TODO: Add license number format validation
        // TODO: Add license verification status
    },
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin'],
        default: 'student'
    },
    // TODO: Move bookings to a separate Booking model for better data structure
    bookings: [{
        lesson: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson'
        },
        date: Date,
        time: String,
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'completed', 'cancelled'],
            default: 'pending'
        },
        // TODO: Add booking notes, instructor feedback, etc.
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    // TODO: Add these fields:
    // profilePicture: String,
    // address: { street: String, city: String, state: String, zipCode: String },
    // emergencyContact: { name: String, phone: String, relationship: String },
    // preferences: { notifications: Boolean, emailUpdates: Boolean, language: String },
    // lastLogin: Date,
    // emailVerified: { type: Boolean, default: false },
    // phoneVerified: { type: Boolean, default: false },
    // twoFactorEnabled: { type: Boolean, default: false },
}, {
    timestamps: true
});

// TODO: Add indexes for better query performance
// userSchema.index({ email: 1 });
// userSchema.index({ role: 1 });
// userSchema.index({ isActive: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    // TODO: Add password complexity validation here
    // TODO: Add password history check
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// TODO: Add these instance methods:
// userSchema.methods.generateEmailVerificationToken = function() { ... };
// userSchema.methods.generatePasswordResetToken = function() { ... };
// userSchema.methods.getPublicProfile = function() { ... };
// userSchema.methods.updateLastLogin = function() { ... };

// TODO: Add these static methods:
// userSchema.statics.findByEmail = function(email) { ... };
// userSchema.statics.findActiveUsers = function() { ... };
// userSchema.statics.getInstructors = function() { ... };

module.exports = mongoose.model("User", userSchema);
