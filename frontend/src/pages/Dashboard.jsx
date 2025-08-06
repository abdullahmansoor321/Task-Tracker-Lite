import React, { useState, useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { useAuthStore } from '../store/useAuthStore';
import { 
  Plus, 
  Calendar, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Target,
  Zap,
  Award,
  BarChart3,
  Activity,
  Users,
  Star,
  LogOut,
  Filter,
  Search,
  Edit3,
  Trash2,
  X
} from 'lucide-react';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  const { tasks, getTasks, updateTask, deleteTask } = useTaskStore();
  const { authUser, refreshUser, logout } = useAuthStore();
  
  // States
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [greeting, setGreeting] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    getTasks();
    setGreeting(getTimeBasedGreeting());
    
    if (authUser) {
      refreshUser();
    }
  }, [getTasks, refreshUser, authUser]);

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const formatMemberSince = (date) => {
    if (!date) return 'Welcome!';
    const memberDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - memberDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Joined today';
    if (diffDays < 30) return `Member for ${diffDays} days`;
    if (diffDays < 365) return `Member for ${Math.floor(diffDays / 30)} months`;
    return `Member for ${Math.floor(diffDays / 365)} years`;
  };

  // Calculate statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'completed').length,
    pending: tasks.filter(task => task.status === 'pending').length,
    overdue: tasks.filter(task => {
      if (task.status === 'completed') return false;
      return new Date(task.dueDate) < new Date();
    }).length
  };

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  // Get upcoming tasks (next 7 days)
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

  // Filter tasks based on active filters
  const getFilteredTasks = () => {
    let filtered = [...tasks];

    // Apply status filter
    if (activeFilter === 'completed') {
      filtered = filtered.filter(task => task.status === 'completed');
    } else if (activeFilter === 'pending') {
      filtered = filtered.filter(task => task.status === 'pending');
    } else if (activeFilter === 'overdue') {
      filtered = filtered.filter(task => 
        task.status === 'pending' && new Date(task.dueDate) < new Date()
      );
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(task => task.category === categoryFilter);
    }

    return filtered;
  };

  const filteredTasks = getFilteredTasks();

  const handleTaskEdit = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleTaskFormClose = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'badge-error';
      case 'Medium': return 'badge-warning';
      case 'Low': return 'badge-success';
      default: return 'badge-ghost';
    }
  };

  const getCategoryIcon = (category) => {
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

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 pt-20">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header with Logout */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-primary/20">
              <img 
                src={authUser?.profilePic || "/avatar.png"} 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-base-content">
                {greeting}, {authUser?.fullName?.split(' ')[0] || 'there'}! 👋
              </h1>
              <p className="text-sm text-base-content/60 flex items-center gap-2">
                <Users className="w-4 h-4" />
                {formatMemberSince(authUser?.createdAt)}
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="btn btn-outline btn-error gap-2 hover:btn-error"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Productivity Overview */}
        <div className="text-center mb-8">
          <p className="text-lg text-base-content/70 mb-4">
            Ready to conquer your day? Let's see what's on your agenda.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="badge badge-primary gap-2">
              <Star className="w-3 h-3" />
              Productivity Score: {completionRate}%
            </div>
            <div className="badge badge-secondary gap-2">
              <Target className="w-3 h-3" />
              {stats.total} Total Tasks
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div 
            className={`stat bg-base-100 rounded-xl shadow-lg border border-primary/10 cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-105 ${activeFilter === 'all' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            <div className="stat-figure text-primary">
              <Target className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Tasks</div>
            <div className="stat-value text-primary">{stats.total}</div>
            <div className="stat-desc">Your complete list</div>
          </div>

          <div 
            className={`stat bg-base-100 rounded-xl shadow-lg border border-success/10 cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-105 ${activeFilter === 'completed' ? 'ring-2 ring-success' : ''}`}
            onClick={() => setActiveFilter('completed')}
          >
            <div className="stat-figure text-success">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="stat-title">Completed</div>
            <div className="stat-value text-success">{stats.completed}</div>
            <div className="stat-desc">Well done! 🎉</div>
          </div>

          <div 
            className={`stat bg-base-100 rounded-xl shadow-lg border border-warning/10 cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-105 ${activeFilter === 'pending' ? 'ring-2 ring-warning' : ''}`}
            onClick={() => setActiveFilter('pending')}
          >
            <div className="stat-figure text-warning">
              <Clock className="w-8 h-8" />
            </div>
            <div className="stat-title">Pending</div>
            <div className="stat-value text-warning">{stats.pending}</div>
            <div className="stat-desc">Keep going!</div>
          </div>

          <div 
            className={`stat bg-base-100 rounded-xl shadow-lg border border-error/10 cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-105 ${activeFilter === 'overdue' ? 'ring-2 ring-error' : ''}`}
            onClick={() => setActiveFilter('overdue')}
          >
            <div className="stat-figure text-error">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="stat-title">Overdue</div>
            <div className="stat-value text-error">{stats.overdue}</div>
            <div className="stat-desc">Needs attention</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
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
                  onClick={() => setShowTaskForm(true)}
                  className="btn btn-primary w-full gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add New Task
                </button>
                
                <button 
                  onClick={() => setActiveFilter('completed')}
                  className={`btn w-full gap-2 ${activeFilter === 'completed' ? 'btn-success' : 'btn-outline'}`}
                >
                  <CheckCircle className="w-4 h-4" />
                  View Completed
                </button>
                
                <button 
                  onClick={() => setActiveFilter('overdue')}
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
                    const daysUntilDue = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
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
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between mb-6">
              <h3 className="card-title">
                Task Management 
                <span className="badge badge-neutral">{filteredTasks.length}</span>
              </h3>
              <button 
                onClick={() => setShowTaskForm(true)}
                className="btn btn-primary gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input input-bordered w-full pl-10"
                />
              </div>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="select select-bordered"
              >
                <option value="all">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="select select-bordered"
              >
                <option value="all">All Categories</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Health">Health</option>
                <option value="Study">Study</option>
                <option value="Finance">Finance</option>
                <option value="Other">Other</option>
              </select>

              <button
                onClick={() => {
                  setActiveFilter('all');
                  setSearchTerm('');
                  setPriorityFilter('all');
                  setCategoryFilter('all');
                }}
                className="btn btn-outline"
              >
                Clear Filters
              </button>
            </div>

            {/* Active Filter Indicator */}
            {(activeFilter !== 'all' || searchTerm || priorityFilter !== 'all' || categoryFilter !== 'all') && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium">Active filters:</span>
                {activeFilter !== 'all' && (
                  <span className="badge badge-primary">{activeFilter}</span>
                )}
                {searchTerm && (
                  <span className="badge badge-secondary">Search: {searchTerm}</span>
                )}
                {priorityFilter !== 'all' && (
                  <span className="badge badge-accent">{priorityFilter} Priority</span>
                )}
                {categoryFilter !== 'all' && (
                  <span className="badge badge-info">{categoryFilter}</span>
                )}
              </div>
            )}

            {/* Tasks Grid */}
            {filteredTasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTasks.map((task) => (
                  <TaskCard 
                    key={task._id} 
                    task={task} 
                    onEdit={handleTaskEdit}
                    getCategoryIcon={getCategoryIcon}
                    getPriorityColor={getPriorityColor}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-sm mx-auto">
                  <div className="mb-6">
                    <CheckCircle className="w-16 h-16 mx-auto text-base-content/20" />
                  </div>
                  <h3 className="text-xl font-bold text-base-content/60 mb-2">
                    {tasks.length === 0 ? 'No tasks yet' : 'No tasks match your filters'}
                  </h3>
                  <p className="text-base-content/50 mb-6">
                    {tasks.length === 0 
                      ? 'Create your first task to get started with your productivity journey!'
                      : 'Try adjusting your filters or create a new task.'
                    }
                  </p>
                  <button 
                    onClick={() => setShowTaskForm(true)}
                    className="btn btn-primary gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create Task
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Task Creation/Edit Modal */}
      {showTaskForm && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
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

// TaskCard Component
const TaskCard = ({ task, onEdit, getCategoryIcon, getPriorityColor }) => {
  const { updateTask, deleteTask } = useTaskStore();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleStatusToggle = async () => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    await updateTask(task._id, { status: newStatus });
  };

  const handleDelete = async () => {
    await deleteTask(task._id);
    setShowDeleteConfirm(false);
  };

  const isOverdue = task.status === 'pending' && new Date(task.dueDate) < new Date();
  const daysUntilDue = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <>
      <div className={`card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${
        task.status === 'completed' ? 'border-l-green-500 opacity-75' : 
        isOverdue ? 'border-l-red-500' : 
        daysUntilDue <= 1 ? 'border-l-orange-500' : 
        'border-l-blue-500'
      }`}>
        <div className="card-body p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className={`font-bold text-sm truncate ${
                task.status === 'completed' ? 'line-through text-base-content/60' : ''
              }`}>
                {task.title}
              </h4>
              {task.description && (
                <p className="text-xs text-base-content/70 mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit(task)}
                className="btn btn-ghost btn-xs"
                title="Edit task"
              >
                <Edit3 className="w-3 h-3" />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="btn btn-ghost btn-xs text-error"
                title="Delete task"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="text-xs">{getCategoryIcon(task.category)}</span>
              <span className={`badge badge-xs ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>
            <div className="text-xs text-base-content/60">
              {isOverdue ? (
                <span className="text-error font-medium">Overdue</span>
              ) : (
                new Date(task.dueDate).toLocaleDateString()
              )}
            </div>
          </div>

          <div className="card-actions justify-end mt-3">
            <button
              onClick={handleStatusToggle}
              className={`btn btn-sm ${
                task.status === 'completed' ? 'btn-success' : 'btn-outline'
              }`}
            >
              {task.status === 'completed' ? 'Completed' : 'Mark Complete'}
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Task</h3>
            <p className="py-4">Are you sure you want to delete "{task.title}"? This action cannot be undone.</p>
            <div className="modal-action">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="btn btn-error"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setShowDeleteConfirm(false)} />
        </div>
      )}
    </>
  );
};

export default Dashboard;
