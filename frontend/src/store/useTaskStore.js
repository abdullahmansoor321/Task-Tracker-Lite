import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useTaskStore = create((set, get) => ({
    tasks: [],
    overdueTasks: [],
    pagination: null,
    taskStats: null,
    currentFilter: 'all', // Track current filter
    isTasksLoading: false,
    isCreatingTask: false,
    isUpdatingTask: false,
    isDeletingTask: false,

    // Get task statistics (separate from paginated tasks)
    getTaskStats: async () => {
        try {
            const res = await axiosInstance.get('/tasks/stats');
            set({ taskStats: res.data });
        } catch (error) {
            console.error("Error fetching task stats:", error);
            if (error.response?.status !== 401) {
                toast.error("Failed to load task statistics");
            }
        }
    },

    // Get tasks with pagination and filtering
    getTasks: async (page = 1, limit = 10, filter = 'all') => {
        set({ isTasksLoading: true, currentFilter: filter });
        try {
            let endpoint = `/tasks?page=${page}&limit=${limit}`;
            
            // Add filter to endpoint based on filter type
            if (filter === 'overdue') {
                endpoint = `/tasks/overdue?page=${page}&limit=${limit}`;
            } else if (filter !== 'all') {
                endpoint = `/tasks?page=${page}&limit=${limit}&status=${filter}`;
            }
            
            const res = await axiosInstance.get(endpoint);
            set({ 
                tasks: res.data.tasks, 
                pagination: res.data.pagination
            });
        } catch (error) {
            console.error("Error fetching tasks:", error);
            // Only show error toast if it's not an authentication error
            if (error.response?.status !== 401) {
                toast.error("Failed to load tasks");
            }
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
            // Only show error toast if it's not an authentication error
            if (error.response?.status !== 401) {
                toast.error("Failed to load overdue tasks");
            }
        } finally {
            set({ isTasksLoading: false });
        }
    },

    // Create a new task
    createTask: async (taskData) => {
        set({ isCreatingTask: true });
        try {
            const res = await axiosInstance.post('/tasks', taskData);
            
            // After creating a task, refresh the current page and stats
            const currentState = get();
            const currentPage = currentState.pagination?.currentPage || 1;
            const currentFilter = currentState.currentFilter || 'all';
            
            await currentState.getTasks(currentPage, 10, currentFilter);
            await currentState.getTaskStats(); // Refresh stats
            
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
            
            // After updating, refresh the current page and stats
            const currentState = get();
            const currentPage = currentState.pagination?.currentPage || 1;
            const currentFilter = currentState.currentFilter || 'all';
            await currentState.getTasks(currentPage, 10, currentFilter);
            await currentState.getTaskStats(); // Refresh stats
            
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
            
            // After deleting, refresh the current page and stats
            const currentState = get();
            const currentPage = currentState.pagination?.currentPage || 1;
            const currentFilter = currentState.currentFilter || 'all';
            const totalPages = currentState.pagination?.totalPages || 1;
            
            // If we deleted the last item on the last page (and it's not page 1), 
            // go back one page
            const tasksOnCurrentPage = currentState.tasks.length;
            if (tasksOnCurrentPage === 1 && currentPage > 1 && currentPage === totalPages) {
                await currentState.getTasks(currentPage - 1, 10, currentFilter);
            } else {
                await currentState.getTasks(currentPage, 10, currentFilter);
            }
            await currentState.getTaskStats(); // Refresh stats
            
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
        const currentState = get();
        const task = currentState.tasks.find(t => t._id === taskId) || 
                    currentState.overdueTasks.find(t => t._id === taskId);
        
        if (!task) return;

        const newStatus = task.status === "pending" ? "completed" : "pending";
        await currentState.updateTask(taskId, { status: newStatus });
    },

    // Refresh current page and stats - useful for external calls
    refreshCurrentPage: async () => {
        const currentState = get();
        const currentPage = currentState.pagination?.currentPage || 1;
        await currentState.getTasks(currentPage);
        await currentState.getTaskStats();
    },

    // Clear tasks (for logout)
    clearTasks: () => {
        set({
            tasks: [],
            overdueTasks: [],
            pagination: null,
            taskStats: null
        });
    }
}));