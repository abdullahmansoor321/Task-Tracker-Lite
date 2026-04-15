import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './route/auth.route.js';
import taskRoutes from './route/task.route.js';
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Dynamic CORS Configuration
const getOrigins = () => {
    const origins = ["http://localhost:5173", "http://localhost:5174"];
    if (process.env.FRONTEND_URL) {
        // Support comma-separated strings for multiple production URLs
        const prodOrigins = process.env.FRONTEND_URL.split(',').map(o => o.trim());
        origins.push(...prodOrigins);
    }
    return origins;
};

app.use(cors({
    origin: getOrigins(),
    credentials: true,
}));


// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Health Check
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

// --- Server Entry ---
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    connectDB();
});

