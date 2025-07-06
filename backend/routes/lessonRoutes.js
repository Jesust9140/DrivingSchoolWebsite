const express = require("express");
const router = express.Router();
const {
    getLessons,
    getLesson,
    addLesson,
    updateLesson,
    deleteLesson
} = require("../controllers/lessonController");

// TODO: Import authentication middleware when created
// const { protect, authorize } = require("../middleware/auth");

// TODO: Import validation middleware
// const { validateLesson, validateLessonUpdate } = require("../middleware/validation");

// Public routes
router.get("/", 
    // TODO: Add query parameter validation for filtering/pagination
    getLessons
);

router.get("/:id", 
    // TODO: Add parameter validation for MongoDB ObjectId
    getLesson
);

// Protected routes (TODO: add auth middleware later)
router.post("/", 
    // TODO: Add authentication middleware - only admin should create lessons
    // protect,
    // authorize('admin'),
    // TODO: Add lesson validation middleware
    // validateLesson,
    addLesson
);

router.put("/:id", 
    // TODO: Add authentication middleware - only admin should update lessons
    // protect,
    // authorize('admin'),
    // TODO: Add lesson update validation middleware
    // validateLessonUpdate,
    updateLesson
);

router.delete("/:id", 
    // TODO: Add authentication middleware - only admin should delete lessons
    // protect,
    // authorize('admin'),
    deleteLesson
);

// TODO: Add these additional routes:
// router.get("/category/:category", getLessonsByCategory);
// router.get("/search", searchLessons);
// router.get("/:id/availability", getLessonAvailability);
// router.put("/:id/availability", protect, authorize('admin', 'instructor'), updateLessonAvailability);
// router.get("/:id/bookings", protect, authorize('admin', 'instructor'), getLessonBookings);
// router.get("/:id/reviews", getLessonReviews);
// router.post("/:id/reviews", protect, addLessonReview);

// TODO: Add instructor-specific routes:
// router.get("/instructor/:instructorId", getLessonsByInstructor);
// router.put("/:id/instructor-notes", protect, authorize('instructor'), updateInstructorNotes);

module.exports = router;
