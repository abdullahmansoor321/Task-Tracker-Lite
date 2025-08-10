import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { 
    getTasks, 
    createTask, 
    updateTask, 
    getOverdueTasks,
    deleteTask,
    getTaskStats
} from '../controllers/task.controller.js';



const router = express.Router();

// POST /tasks → Add task (only logged-in user)
router.post("/", protectRoute, createTask);

// GET /tasks → Fetch only logged-in user's tasks
router.get("/", protectRoute, getTasks);

// GET /tasks/overdue → Fetch tasks with dueDate < today and status != completed
router.get("/overdue", protectRoute, getOverdueTasks);

// GET /tasks/stats → Get task statistics
router.get("/stats", protectRoute, getTaskStats);

// PATCH /tasks/:id → Update task status or description
router.patch("/:id", protectRoute, updateTask);

// DELETE /tasks/:id → Delete a task (only task owner)
router.delete("/:id", protectRoute, deleteTask);

export default router;
