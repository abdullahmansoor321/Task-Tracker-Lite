import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set, get) => ({
  authUser: null,

  // Loading States
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  onlineUsers: [],

  // Check if user is authenticated
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error checking authentication:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Refresh user data
  refreshUser: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data });
      return res.data;
    } catch (error) {
      console.error("Error refreshing user data:", error);
      return null;
    }
  },

  // Signup Function
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post('/auth/signup', data);
      set({ authUser: res.data });
      toast.success("Account created successfully!");
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(
        error.response?.data?.message || error.message || "Signup failed"
      );
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Login Function
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(
        error.response?.data?.message || error.message || "Login failed"
      );
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // Logout Function (POST Method)
  logout: async () => {
    const state = get();
    if (state.isLoggingOut) return; // Prevent multiple calls
    
    set({ isLoggingOut: true });
    
    try {
      // Clear tasks first to prevent errors
      try {
        const { useTaskStore } = await import('./useTaskStore.js');
        useTaskStore.getState().clearTasks();
      } catch (error) {
        // Task store might not be loaded yet
      }
      
      await axiosInstance.post('/auth/logout');
      set({ authUser: null, isLoggingOut: false });
      
      toast.success("Logged out successfully!");
      
      // Navigate to login page immediately
      window.location.href = '/login';
      
    } catch (error) {
      console.error("Error during logout:", error);
      set({ isLoggingOut: false });
      toast.error(
        error.response?.data?.message || error.message || "Logout failed"
      );
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put('/auth/update-profile', data);
      set((state) => ({
        authUser: { ...state.authUser, ...res.data }
      }));
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        error.response?.data?.message || error.message || "Profile update failed"
      );
    } finally {
      set({ isUpdatingProfile: false });
    }

  }
}));
