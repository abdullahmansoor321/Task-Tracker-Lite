/**
 * Shared task utility functions
 */

/**
 * Check if a task is overdue
 * @param {Object} task - Task object
 * @returns {boolean} - True if task is overdue
 */
export const isTaskOverdue = (task) => {
  if (task.status === 'completed') return false;
  return new Date(task.dueDate) < new Date();
};

/**
 * Calculate days until due date
 * @param {string} dueDate - Due date string
 * @returns {number} - Days until due (negative if overdue)
 */
export const getDaysUntilDue = (dueDate) => {
  return Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));
};

/**
 * Get priority color class
 * @param {string} priority - Priority level
 * @returns {string} - CSS class for priority badge
 */
export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High': return 'badge-error';
    case 'Medium': return 'badge-warning';
    case 'Low': return 'badge-success';
    default: return 'badge-ghost';
  }
};

/**
 * Get category icon
 * @param {string} category - Category name
 * @returns {string} - Emoji icon for category
 */
export const getCategoryIcon = (category) => {
  switch (category) {
    case 'Work': return '💼';
    case 'Personal': return '🏠';
    case 'Health': return '🏃';
    case 'Study': return '📚';
    case 'Finance': return '💰';
    case 'Other': return '📝';
    default: return '📝';
  }
};

/**
 * Filter tasks by status with overdue logic
 * @param {Array} tasks - Array of tasks
 * @param {string} status - Status filter ('all', 'pending', 'completed', 'overdue')
 * @returns {Array} - Filtered tasks
 */
export const filterTasksByStatus = (tasks, status) => {
  if (status === 'all') return tasks;
  if (status === 'overdue') {
    return tasks.filter(task => isTaskOverdue(task));
  }
  return tasks.filter(task => task.status === status);
};
