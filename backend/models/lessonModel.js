const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    duration: {
        type: Number,
        required: true,
        min: 1 // Duration in hours
    },
    category: {
        type: String,
        enum: ['theory', 'practical', 'intensive', 'refresher'],
        default: 'practical'
    },
    instructor: {
        type: String,
        required: true
    },
    availableSlots: [{
        date: Date,
        time: String,
        isBooked: {
            type: Boolean,
            default: false
        }
    }],
    features: [String],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Lesson", lessonSchema);
