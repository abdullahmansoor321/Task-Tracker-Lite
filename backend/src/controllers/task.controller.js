import Task from "../models/task.model.js";

// POST /tasks → Add task (only logged-in user)
export const createTask = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        const userId = req.user._id;

        // Validate required fields
        if (!title || !dueDate) {
            return res.status(400).json({ message: "Title and due date are required" });
        }

        const newTask = new Task({
            title,
            description,
            dueDate: new Date(dueDate),
            userId,
            status: "pending"
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error creating task:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// GET /tasks → Fetch only logged-in user's tasks with pagination
export const getTasks = async (req, res) => {
    try {
        const userId = req.user._id;
        
        // Pagination parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Get total count for pagination info
        const totalTasks = await Task.countDocuments({ userId });
        
        // Get paginated tasks
        const tasks = await Task.find({ userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Calculate pagination info
        const totalPages = Math.ceil(totalTasks / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        res.status(200).json({
            tasks,
            pagination: {
                currentPage: page,
                totalPages,
                totalTasks,
                hasNextPage,
                hasPrevPage,
                limit
            }
        });
    } catch (error) {
        console.error("Error fetching tasks:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// PATCH /tasks/:id → Update task status or description
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const { status, description } = req.body;

        // Find task and check if it belongs to the user
        const task = await Task.findOne({ _id: id, userId });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Tricky Rule: A task cannot be marked as completed if its dueDate is in the future
        if (status === "completed") {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
            const taskDueDate = new Date(task.dueDate);
            taskDueDate.setHours(0, 0, 0, 0);

            if (taskDueDate > today) {
                return res.status(400).json({ 
                    message: "Task cannot be marked as completed if its due date is in the future" 
                });
            }
        }

        // Update only the fields that are provided
        const updateData = {};
        if (status !== undefined) updateData.status = status;
        if (description !== undefined) updateData.description = description;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// DELETE /tasks/:id → Delete a task (only task owner)
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        // Find task and check if it belongs to the user
        const task = await Task.findOne({ _id: id, userId });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Delete the task
        await Task.findByIdAndDelete(id);
        
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// GET /tasks/overdue → Fetch tasks with dueDate < today and status != completed with pagination
export const getOverdueTasks = async (req, res) => {
    try {
        const userId = req.user._id;
        const today = new Date();
        today.setHours(23, 59, 59, 999); // Set to end of today for accurate comparison

        // Pagination parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Query for overdue tasks
        const overdueQuery = {
            userId,
            dueDate: { $lt: today },
            status: { $ne: "completed" }
        };

        // Get total count for pagination info
        const totalOverdueTasks = await Task.countDocuments(overdueQuery);

        // Get paginated overdue tasks
        const overdueTasks = await Task.find(overdueQuery)
            .sort({ dueDate: 1 }) // Sort by due date (oldest first)
            .skip(skip)
            .limit(limit);

        // Calculate pagination info
        const totalPages = Math.ceil(totalOverdueTasks / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        res.status(200).json({
            tasks: overdueTasks,
            pagination: {
                currentPage: page,
                totalPages,
                totalTasks: totalOverdueTasks,
                hasNextPage,
                hasPrevPage,
                limit
            }
        });
    } catch (error) {
        console.error("Error fetching overdue tasks:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
