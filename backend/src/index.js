import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './route/auth.route.js';
import taskRoutes from './route/task.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware must be before routes
app.use(express.json({ limit: '10mb' })); // Increase body size limit for image uploads
app.use(cookieParser()); 
// CORS configuration with environment detection
const getCorsOrigins = () => {
    const origins = [];
    
    // Always allow localhost for development
    if (process.env.NODE_ENV !== 'production') {
        origins.push(
            "http://localhost:5173", 
            "http://localhost:5174", 
            "http://localhost:5175", 
            "http://localhost:5176"
        );
    }
    
    // In production, allow Vercel frontend
    if (process.env.NODE_ENV === 'production') {
        origins.push(
            "https://task-tracker-lite-mu.vercel.app",
            "https://task-tracker-lite-1a5wjtkfz.vercel.app",
            "https://task-tracker-lite-abdullahmansoor321s-projects.vercel.app"
        );
    }
    
    // Always include environment variable if set
    if (process.env.FRONTEND_URL) {
        origins.push(process.env.FRONTEND_URL);
    }
    
    return origins.filter(Boolean);
};

app.use(cors({
    origin: getCorsOrigins(),
    credentials: true
}));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Start server
app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
    console.log('Environment:', process.env.NODE_ENV);
    connectDB();
});
