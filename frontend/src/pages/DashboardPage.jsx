import React, { useState, useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';
import TaskList from '../components/TaskList';
import toast from 'react-hot-toast';
import { 
  Plus, 
  Calendar, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Target,
  Zap,
  Activity,
  Star
} from 'lucide-react';
import TaskForm from '../components/TaskForm';
import { isTaskOverdue, getDaysUntilDue } from '../lib/taskUtils';

const DashboardPage = () => {
  const { 
    tasks, 
    pagination,
    taskStats,
    getTasks,
    getTaskStats,
    isTasksLoading
  } = useTaskStore();
  const { authUser, refreshUser } = useAuthStore();
  const { theme } = useThemeStore();
  
  // States
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [greeting, setGreeting] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Scroll to task management section
  const scrollToTaskManagement = () => {
    const taskManagementSection = document.getElementById('task-management');
    if (taskManagementSection) {
      taskManagementSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle filter changes with scroll - always start from page 1
  const handleFilterChange = (value) => {
    setActiveFilter(value);
    setCurrentPage(1); // Always reset to page 1 when filter changes
    getTasks(1, 10, value); // Fetch first page of filtered results
    scrollToTaskManagement();
  };

  // Handle page changes within current filter
  const handlePageChange = (page) => {
    setCurrentPage(page);
    getTasks(page, 10, activeFilter); // Use current filter
    scrollToTaskManagement();
  };

  useEffect(() => {
    // Don't auto-fetch on currentPage change, let handlePageChange handle it
    // This prevents duplicate calls
  }, [currentPage]);

  // Initial load effect
  useEffect(() => {
    getTasks(1, 10, 'all'); // Start with all tasks, page 1
    getTaskStats(); // Fetch stats on initial load
    setGreeting(getTimeBasedGreeting());
    
    if (authUser) {
      refreshUser();
    }
  }, []); // Only run on mount

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Calculate statistics - use dedicated stats endpoint for accurate totals
  const stats = {
    total: taskStats?.totalTasks || 0,
    completed: taskStats?.completedTasks || 0,
    pending: taskStats?.pendingTasks || 0,
    overdue: taskStats?.overdueTasks || 0
  };

  const completionRate = taskStats?.completionRate || 0;

  // Get upcoming tasks (next 7 days) from current page
  const upcomingTasks = tasks
    .filter(task => task.status === 'pending')
    .filter(task => {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return dueDate >= today && dueDate <= nextWeek;
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  const handleTaskEdit = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleTaskFormClose = () => {
    setShowTaskForm(false);
    setEditingTask(null);
    // Refresh current page and stats after form close
    getTasks(currentPage, 10, activeFilter);
    getTaskStats();
  };

  const handleAddTask = () => {
    setShowTaskForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 pt-16">
      <div className="container mx-auto px-4 py-4">
        
        {/* Welcome Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
              <img 
                src={authUser?.profilePic || "/avatar.png"} 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content mb-3">
            {greeting}, {authUser?.fullName?.split(' ')[0] || 'there'}! 👋
          </h1>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-sm sm:text-base text-base-content/70 mb-4 px-4">
              Ready to conquer your day? Let's see what's on your agenda and make it productive!
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              <div className="badge badge-primary badge-sm sm:badge-lg gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3">
                <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">Productivity Score: {completionRate}%</span>
              </div>
              <div className="badge badge-secondary badge-sm sm:badge-lg gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3">
                <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">{stats.total} Total Tasks</span>
              </div>
              <div className="badge badge-accent badge-sm sm:badge-lg gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3">
                <Activity className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">{stats.completed} Completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          {/* Total Tasks Card */}
          <div 
            className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
              theme === 'light' 
                ? 'bg-blue-500 text-white border-0' 
                : 'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20'
            } transition-all duration-300 hover:shadow-2xl ${
              theme === 'light' 
                ? 'hover:shadow-blue-500/25 hover:bg-blue-600' 
                : 'hover:shadow-primary/25'
            } hover:-translate-y-1 ${activeFilter === 'all' ? (theme === 'light' ? 'ring-2 ring-blue-300 shadow-lg shadow-blue-500/20' : 'ring-2 ring-primary shadow-lg shadow-primary/20') : ''}`}
            onClick={() => {
              handleFilterChange('all');
            }}
          >
            <div className={`absolute inset-0 ${
              theme === 'light' 
                ? 'bg-gradient-to-br from-white/5 to-transparent' 
                : 'bg-gradient-to-br from-primary/5 to-transparent'
            } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  theme === 'light' 
                    ? 'bg-white/20 group-hover:bg-white/30' 
                    : 'bg-primary/10 group-hover:bg-primary/20'
                } transition-colors duration-300`}>
                  <Target className={`w-6 h-6 ${theme === 'light' ? 'text-white' : 'text-primary'}`} />
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${theme === 'light' ? 'text-white' : 'text-primary'}`}>{stats.total}</div>
                </div>
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${theme === 'light' ? 'text-white/90' : 'text-base-content/80'}`}>Total Tasks</h3>
                <p className={`text-sm ${theme === 'light' ? 'text-white/70' : 'text-base-content/60'}`}>All time tasks</p>
              </div>
            </div>
          </div>

          {/* Completed Tasks Card */}
          <div 
            className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
              theme === 'light' 
                ? 'bg-green-500 text-white border-0' 
                : 'bg-gradient-to-br from-success/10 via-success/5 to-transparent border border-success/20'
            } transition-all duration-300 hover:shadow-2xl ${
              theme === 'light' 
                ? 'hover:shadow-green-500/25 hover:bg-green-600' 
                : 'hover:shadow-success/25'
            } hover:-translate-y-1 ${activeFilter === 'completed' ? (theme === 'light' ? 'ring-2 ring-green-300 shadow-lg shadow-green-500/20' : 'ring-2 ring-success shadow-lg shadow-success/20') : ''}`}
            onClick={() => handleFilterChange('completed')}
          >
            <div className={`absolute inset-0 ${
              theme === 'light' 
                ? 'bg-gradient-to-br from-white/5 to-transparent' 
                : 'bg-gradient-to-br from-success/5 to-transparent'
            } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  theme === 'light' 
                    ? 'bg-white/20 group-hover:bg-white/30' 
                    : 'bg-success/10 group-hover:bg-success/20'
                } transition-colors duration-300`}>
                  <CheckCircle className={`w-6 h-6 ${theme === 'light' ? 'text-white' : 'text-success'}`} />
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${theme === 'light' ? 'text-white' : 'text-success'}`}>{stats.completed}</div>
                </div>
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${theme === 'light' ? 'text-white/90' : 'text-base-content/80'}`}>Completed</h3>
                <p className={`text-sm ${theme === 'light' ? 'text-white/70' : 'text-base-content/60'}`}>Successfully finished</p>
              </div>
            </div>
          </div>

          {/* Pending Tasks Card */}
          <div 
            className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
              theme === 'light' 
                ? 'bg-orange-500 text-white border-0' 
                : 'bg-gradient-to-br from-warning/10 via-warning/5 to-transparent border border-warning/20'
            } transition-all duration-300 hover:shadow-2xl ${
              theme === 'light' 
                ? 'hover:shadow-orange-500/25 hover:bg-orange-600' 
                : 'hover:shadow-warning/25'
            } hover:-translate-y-1 ${activeFilter === 'pending' ? (theme === 'light' ? 'ring-2 ring-orange-300 shadow-lg shadow-orange-500/20' : 'ring-2 ring-warning shadow-lg shadow-warning/20') : ''}`}
            onClick={() => handleFilterChange('pending')}
          >
            <div className={`absolute inset-0 ${
              theme === 'light' 
                ? 'bg-gradient-to-br from-white/5 to-transparent' 
                : 'bg-gradient-to-br from-warning/5 to-transparent'
            } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  theme === 'light' 
                    ? 'bg-white/20 group-hover:bg-white/30' 
                    : 'bg-warning/10 group-hover:bg-warning/20'
                } transition-colors duration-300`}>
                  <Clock className={`w-6 h-6 ${theme === 'light' ? 'text-white' : 'text-warning'}`} />
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${theme === 'light' ? 'text-white' : 'text-warning'}`}>{stats.pending}</div>
                </div>
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${theme === 'light' ? 'text-white/90' : 'text-base-content/80'}`}>Pending</h3>
                <p className={`text-sm ${theme === 'light' ? 'text-white/70' : 'text-base-content/60'}`}>Need attention</p>
              </div>
            </div>
          </div>

          {/* Overdue Tasks Card */}
          <div 
            className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
              theme === 'light' 
                ? 'bg-red-500 text-white border-0' 
                : 'bg-gradient-to-br from-error/10 via-error/5 to-transparent border border-error/20'
            } transition-all duration-300 hover:shadow-2xl ${
              theme === 'light' 
                ? 'hover:shadow-red-500/25 hover:bg-red-600' 
                : 'hover:shadow-error/25'
            } hover:-translate-y-1 ${activeFilter === 'overdue' ? (theme === 'light' ? 'ring-2 ring-red-300 shadow-lg shadow-red-500/20' : 'ring-2 ring-error shadow-lg shadow-error/20') : ''}`}
            onClick={() => handleFilterChange('overdue')}
          >
            <div className={`absolute inset-0 ${
              theme === 'light' 
                ? 'bg-gradient-to-br from-white/5 to-transparent' 
                : 'bg-gradient-to-br from-error/5 to-transparent'
            } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  theme === 'light' 
                    ? 'bg-white/20 group-hover:bg-white/30' 
                    : 'bg-error/10 group-hover:bg-error/20'
                } transition-colors duration-300`}>
                  <AlertTriangle className={`w-6 h-6 ${theme === 'light' ? 'text-white' : 'text-error'}`} />
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${theme === 'light' ? 'text-white' : 'text-error'}`}>{stats.overdue}</div>
                </div>
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${theme === 'light' ? 'text-white/90' : 'text-base-content/80'}`}>Overdue</h3>
                <p className={`text-sm ${theme === 'light' ? 'text-white/70' : 'text-base-content/60'}`}>Past deadline</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          
          {/* Productivity Score */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Productivity Score
              </h3>
              
              <div className="flex items-center justify-center my-4">
                <div className="radial-progress text-primary" style={{"--value": completionRate, "--size": "6rem"}} role="progressbar">
                  <span className="text-xl font-bold">{completionRate}%</span>
                </div>
              </div>
              
              <p className="text-center text-base-content/70">
                {completionRate >= 80 ? 'Excellent work! 🚀' : 
                 completionRate >= 60 ? 'Great progress! 📈' : 
                 completionRate >= 40 ? 'Keep it up! 💪' : 
                 'Time to focus! ⚡'}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title flex items-center gap-2">
                <Zap className="w-5 h-5 text-warning" />
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <button 
                  onClick={handleAddTask}
                  className="btn btn-primary w-full gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add New Task
                </button>
                
                <button 
                  onClick={() => handleFilterChange('completed')}
                  className={`btn w-full gap-2 ${activeFilter === 'completed' ? 'btn-success' : 'btn-outline'}`}
                >
                  <CheckCircle className="w-4 h-4" />
                  View Completed
                </button>
                
                <button 
                  onClick={() => handleFilterChange('overdue')}
                  className={`btn w-full gap-2 ${activeFilter === 'overdue' ? 'btn-error' : 'btn-outline'}`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  Show Overdue
                </button>
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary" />
                Coming Up
              </h3>
              
              {upcomingTasks.length > 0 ? (
                <div className="space-y-3">
                  {upcomingTasks.map((task) => {
                    const daysUntilDue = getDaysUntilDue(task.dueDate);
                    const isUrgent = daysUntilDue <= 1;
                    
                    return (
                      <div key={task._id} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        isUrgent ? 'bg-error/10 border border-error/20' : 'bg-base-200 hover:bg-base-300'
                      }`}>
                        <Calendar className={`w-4 h-4 flex-shrink-0 ${
                          isUrgent ? 'text-error' : 'text-secondary'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate ${isUrgent ? 'text-error' : ''}`}>
                            {task.title}
                          </p>
                          <p className="text-xs text-base-content/60">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className={`text-xs px-2 py-1 rounded ${
                          isUrgent ? 'bg-error text-error-content' : 
                          daysUntilDue <= 3 ? 'bg-warning text-warning-content' : 
                          'bg-base-300 text-base-content'
                        }`}>
                          {daysUntilDue === 0 ? 'Today' :
                           daysUntilDue === 1 ? 'Tomorrow' :
                           `${daysUntilDue} days`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-base-content/60">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="font-medium">No upcoming tasks</p>
                  <p className="text-sm mb-4">You're all caught up! 🎉</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Task Management Section */}
        <div id="task-management">
          <TaskList 
            tasks={tasks}
            pagination={pagination}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onTaskEdit={handleTaskEdit}
            onAddTask={handleAddTask}
            onPageChange={handlePageChange}
            isLoading={isTasksLoading}
          />
        </div>
      </div>

      {/* Task Creation/Edit Modal */}
      {showTaskForm && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-2xl mx-4 sm:mx-auto">
            <TaskForm 
              taskToEdit={editingTask}
              onClose={handleTaskFormClose} 
            />
          </div>
          <div className="modal-backdrop" onClick={handleTaskFormClose} />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;