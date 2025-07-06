const Lesson = require("../models/lessonModel");

// Get all lessons
exports.getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find({ isActive: true });
        res.json({
            success: true,
            count: lessons.length,
            data: lessons
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

// Get single lesson
exports.getLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        
        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }
        
        res.json({
            success: true,
            data: lesson
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

// Add new lesson
exports.addLesson = async (req, res) => {
    try {
        const lesson = await Lesson.create(req.body);
        res.status(201).json({
            success: true,
            data: lesson
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Bad Request",
            error: error.message
        });
    }
};

// Update lesson
exports.updateLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }
        
        res.json({
            success: true,
            data: lesson
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Bad Request",
            error: error.message
        });
    }
};

// Delete lesson
exports.deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndDelete(req.params.id);
        
        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }
        
        res.json({
            success: true,
            message: "Lesson deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
