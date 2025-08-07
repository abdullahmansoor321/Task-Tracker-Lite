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
app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
    origin: [
        "http://localhost:5173", 
        "http://localhost:5174", 
        "http://localhost:5175", 
        "http://localhost:5176"
    ],
    credentials: true
}));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Start server
app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
    connectDB();
});
