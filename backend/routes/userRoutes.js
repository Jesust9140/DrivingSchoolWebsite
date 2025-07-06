const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    bookLesson
} = require("../controllers/userController");

// TODO: Import authentication middleware when created
// const { protect, authorize } = require("../middleware/auth");

// TODO: Import validation middleware
// const { validateRegister, validateLogin, validateBooking } = require("../middleware/validation");

// TODO: Import rate limiting middleware
// const { loginLimiter, registerLimiter } = require("../middleware/rateLimiter");

// Public routes
router.post("/register", 
    // TODO: Add validation middleware
    // validateRegister,
    // TODO: Add rate limiting
    // registerLimiter,
    registerUser
);

router.post("/login", 
    // TODO: Add validation middleware
    // validateLogin,
    // TODO: Add rate limiting for login attempts
    // loginLimiter,
    loginUser
);

// Protected routes (TODO: add auth middleware later)
router.get("/profile", 
    // TODO: Add authentication middleware
    // protect,
    getUserProfile
);

router.post("/book", 
    // TODO: Add authentication middleware
    // protect,
    // TODO: Add booking validation middleware
    // validateBooking,
    bookLesson
);

// TODO: Add these additional routes:
// router.put("/profile", protect, updateProfile);
// router.put("/change-password", protect, changePassword);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);
// router.get("/bookings", protect, getUserBookings);
// router.put("/bookings/:id", protect, updateBooking);
// router.delete("/bookings/:id", protect, cancelBooking);
// router.post("/verify-email", verifyEmail);
// router.post("/resend-verification", protect, resendVerification);

// TODO: Add admin-only routes for user management:
// router.get("/", protect, authorize('admin'), getAllUsers);
// router.put("/:id", protect, authorize('admin'), updateUser);
// router.delete("/:id", protect, authorize('admin'), deleteUser);

module.exports = router;
