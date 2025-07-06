const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    bookLesson
} = require("../controllers/userController");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes (you can add auth middleware later)
router.get("/profile", getUserProfile);
router.post("/book", bookLesson);

module.exports = router;
