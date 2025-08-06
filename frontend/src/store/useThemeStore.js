import { create } from "zustand";

export const useThemeStore = create((set, get) => ({
  theme: localStorage.getItem("task-tracker-theme") || "light",
  setTheme: (theme) => {
    localStorage.setItem("task-tracker-theme", theme);
    set({ theme });
  },
  toggleTheme: () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("task-tracker-theme", newTheme);
    set({ theme: newTheme });
  },
}));