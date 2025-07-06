const mongoose = require("mongoose");

// TODO: Add lesson reviews/ratings schema
// TODO: Add lesson prerequisites field
// TODO: Add lesson capacity/max students field
// TODO: Consider separating availability into its own model

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        // TODO: Add title length validation
        // TODO: Add title uniqueness validation per instructor
    },
    description: {
        type: String,
        required: true,
        // TODO: Add description length validation
        // TODO: Add rich text support for formatting
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        // TODO: Add maximum price validation
        // TODO: Consider supporting different currencies
    },
    duration: {
        type: Number,
        required: true,
        min: 1, // Duration in hours
        // TODO: Support fractional hours (e.g., 1.5 hours)
        // TODO: Add maximum duration validation
    },
    category: {
        type: String,
        enum: ['theory', 'practical', 'intensive', 'refresher'],
        default: 'practical',
        // TODO: Add more categories as needed
        // TODO: Make categories configurable through admin panel
    },
    instructor: {
        type: String,
        required: true,
        // TODO: Change to ObjectId reference to User model
        // TODO: Add instructor availability validation
    },
    // TODO: Move this to a separate Availability model for better scalability
    availableSlots: [{
        date: Date,
        time: String,
        isBooked: {
            type: Boolean,
            default: false
        },
        // TODO: Add bookedBy field to track who booked the slot
        // TODO: Add recurring availability support
    }],
    features: [String], // What's included in the lesson
    // TODO: Add these fields:
    // prerequisites: [String], // Required skills or previous lessons
    // maxStudents: { type: Number, default: 1 }, // For group lessons
    // vehicle: { type: String, enum: ['manual', 'automatic'] },
    // ageRequirement: { min: Number, max: Number },
    // difficultyLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    // estimatedPassRate: Number, // Percentage of students who pass after this lesson
    // totalBookings: { type: Number, default: 0 }, // For popularity tracking
    // averageRating: { type: Number, default: 0 }, // Calculated from reviews
    // reviewCount: { type: Number, default: 0 },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// TODO: Add indexes for better query performance
// lessonSchema.index({ category: 1 });
// lessonSchema.index({ instructor: 1 });
// lessonSchema.index({ price: 1 });
// lessonSchema.index({ isActive: 1 });
// lessonSchema.index({ 'availableSlots.date': 1 });

// TODO: Add virtual fields
// lessonSchema.virtual('bookingCount').get(function() {
//     return this.availableSlots.filter(slot => slot.isBooked).length;
// });

// TODO: Add instance methods
// lessonSchema.methods.getAvailableSlots = function(date) { ... };
// lessonSchema.methods.bookSlot = function(date, time, userId) { ... };
// lessonSchema.methods.cancelBooking = function(date, time) { ... };
// lessonSchema.methods.updateRating = function() { ... };

// TODO: Add static methods
// lessonSchema.statics.findByCategory = function(category) { ... };
// lessonSchema.statics.findByInstructor = function(instructorId) { ... };
// lessonSchema.statics.findAvailable = function(date) { ... };
// lessonSchema.statics.getPopularLessons = function() { ... };

// TODO: Add pre/post middleware
// lessonSchema.pre('save', function(next) {
//     // Update totalBookings count
//     this.totalBookings = this.availableSlots.filter(slot => slot.isBooked).length;
//     next();
// });

module.exports = mongoose.model("Lesson", lessonSchema);
