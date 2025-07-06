const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
require("dotenv").config();

// Connect to database
connectDB();

const app = express();

// TODO: Add security middleware (helmet, express-rate-limit, etc.)
// TODO: Add request logging middleware (morgan)
// TODO: Add compression middleware for better performance

// Middleware
app.use(cors({
    // TODO: Restrict CORS to specific origins in production
    // origin: process.env.CLIENT_URL,
    // credentials: true,
}));
app.use(express.json({ limit: '10mb' })); // TODO: Adjust limit based on needs
app.use(express.urlencoded({ extended: false }));

// TODO: Add request validation middleware
// TODO: Add authentication middleware
// TODO: Add rate limiting middleware

// Routes
app.use("/api/lessons", require("./routes/lessonRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// TODO: Add more route groups:
// app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api/instructor", require("./routes/instructorRoutes"));
// app.use("/api/bookings", require("./routes/bookingRoutes"));
// app.use("/api/payments", require("./routes/paymentRoutes"));

// Health check route
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Driving School API is running!",
        timestamp: new Date().toISOString(),
        // TODO: Add more health check information
        // environment: process.env.NODE_ENV,
        // version: process.env.npm_package_version,
        // uptime: process.uptime(),
    });
});

// TODO: Add API documentation endpoint (Swagger/OpenAPI)
// app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    // TODO: Add proper error logging service (Winston, etc.)
    // TODO: Add error reporting service (Sentry, etc.)
    
    res.status(500).json({
        success: false,
        message: "Something went wrong!",
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
    });
});

// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

module.exports = app;
