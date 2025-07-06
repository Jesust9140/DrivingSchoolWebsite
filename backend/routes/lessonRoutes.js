const express = require("express");
const router = express.Router();
const {
    getLessons,
    getLesson,
    addLesson,
    updateLesson,
    deleteLesson
} = require("../controllers/lessonController");

// Public routes
router.get("/", getLessons);
router.get("/:id", getLesson);

// Protected routes (you can add auth middleware later)
router.post("/", addLesson);
router.put("/:id", updateLesson);
router.delete("/:id", deleteLesson);

module.exports = router;
