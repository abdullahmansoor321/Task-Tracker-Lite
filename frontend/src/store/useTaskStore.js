import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useTaskStore = create((set, get) => ({
    tasks: [],
    overdueTasks: [],
    pagination: null,
    isTasksLoading: false,
    isCreatingTask: false,
    isUpdatingTask: false,
    isDeletingTask: false,

    // Get all tasks with pagination
    getTasks: async (page = 1, limit = 10) => {
        set({ isTasksLoading: true });
        try {
            const res = await axiosInstance.get(`/tasks?page=${page}&limit=${limit}`);
            set({ 
                tasks: res.data.tasks, 
                pagination: res.data.pagination 
            });
        } catch (error) {
            console.error("Error fetching tasks:", error);
            toast.error("Failed to load tasks");
        } finally {
            set({ isTasksLoading: false });
        }
    },

    // Get overdue tasks
    getOverdueTasks: async (page = 1, limit = 10) => {
        set({ isTasksLoading: true });
        try {
            const res = await axiosInstance.get(`/tasks/overdue?page=${page}&limit=${limit}`);
            set({ 
                overdueTasks: res.data.tasks,
                pagination: res.data.pagination 
            });
        } catch (error) {
            console.error("Error fetching overdue tasks:", error);
            toast.error("Failed to load overdue tasks");
        } finally {
            set({ isTasksLoading: false });
        }
    },

    // Create a new task
    createTask: async (taskData) => {
        set({ isCreatingTask: true });
        try {
            const res = await axiosInstance.post('/tasks', taskData);
            // Refresh current page data to get updated counts
            const currentState = get();
            if (currentState.pagination) {
                currentState.getTasks(currentState.pagination.currentPage);
            }
            toast.success("Task created successfully");
            return res.data;
        } catch (error) {
            console.error("Error creating task:", error);
            toast.error(error.response?.data?.message || "Failed to create task");
            throw error;
        } finally {
            set({ isCreatingTask: false });
        }
    },

    // Update a task
    updateTask: async (taskId, updateData) => {
        set({ isUpdatingTask: true });
        try {
            const res = await axiosInstance.patch(`/tasks/${taskId}`, updateData);
            // Refresh current page data to get updated information
            const currentState = get();
            if (currentState.pagination) {
                currentState.getTasks(currentState.pagination.currentPage);
            }
            toast.success("Task updated successfully");
            return res.data;
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error(error.response?.data?.message || "Failed to update task");
            throw error;
        } finally {
            set({ isUpdatingTask: false });
        }
    },

    // Delete a task
    deleteTask: async (taskId) => {
        set({ isDeletingTask: true });
        try {
            await axiosInstance.delete(`/tasks/${taskId}`);
            // Refresh current page data to get updated counts
            const currentState = get();
            if (currentState.pagination) {
                currentState.getTasks(currentState.pagination.currentPage);
            }
            toast.success("Task deleted successfully");
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error(error.response?.data?.message || "Failed to delete task");
            throw error;
        } finally {
            set({ isDeletingTask: false });
        }
    },

    // Toggle task status (pending <-> completed)
    toggleTaskStatus: async (taskId) => {
        const task = get().tasks.find(t => t._id === taskId) || 
                    get().overdueTasks.find(t => t._id === taskId);
        
        if (!task) return;

        const newStatus = task.status === "pending" ? "completed" : "pending";
        await get().updateTask(taskId, { status: newStatus });
    },

    // Clear tasks (for logout)
    clearTasks: () => {
        set({
            tasks: [],
            overdueTasks: [],
            pagination: null
        });
    }
}));
