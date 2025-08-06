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
  Star
} from 'lucide-react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Dashboard = () => {
  const { tasks, getTasks } = useTaskStore();
  const { authUser, refreshUser } = useAuthStore();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    getTasks();
    setGreeting(getTimeBasedGreeting());
    
    // Refresh user data when dashboard loads
    if (authUser) {
      refreshUser();
    }
  }, [getTasks, refreshUser, authUser]);

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formatMemberSince = (createdAt) => {
    if (!createdAt) return 'Recently joined';
    
    try {
      const date = new Date(createdAt);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 30) {
        return `Member for ${diffDays} days`;
      } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `Member for ${months} month${months > 1 ? 's' : ''}`;
      } else {
        const years = Math.floor(diffDays / 365);
        return `Member for ${years} year${years > 1 ? 's' : ''}`;
      }
    } catch (error) {
      return 'Recently joined';
    }
  };

  // Calculate dashboard stats
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

  // Get recent tasks (last 5)
  const recentTasks = tasks
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Get upcoming tasks (next 3 due)
  const upcomingTasks = tasks
    .filter(task => task.status === 'pending')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 pt-20">
      <div className="container mx-auto px-4 py-8">
        
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-primary/20">
              <img 
                src={authUser?.profilePic || "/avatar.png"} 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-base-content">
                {greeting}, {authUser?.fullName?.split(' ')[0] || 'there'}! 👋
              </h1>
              <p className="text-sm text-base-content/60 flex items-center gap-2">
                <Users className="w-4 h-4" />
                {formatMemberSince(authUser?.createdAt)}
              </p>
            </div>
          </div>
          <p className="text-lg text-base-content/70">
            Ready to conquer your day? Let's see what's on your agenda.
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
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

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="stat bg-base-100 rounded-xl shadow-lg border border-primary/10">
            <div className="stat-figure text-primary">
              <Target className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Tasks</div>
            <div className="stat-value text-primary">{stats.total}</div>
            <div className="stat-desc">Your complete list</div>
          </div>

          <div className="stat bg-base-100 rounded-xl shadow-lg border border-success/10">
            <div className="stat-figure text-success">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="stat-title">Completed</div>
            <div className="stat-value text-success">{stats.completed}</div>
            <div className="stat-desc">Well done! 🎉</div>
          </div>

          <div className="stat bg-base-100 rounded-xl shadow-lg border border-warning/10">
            <div className="stat-figure text-warning">
              <Clock className="w-8 h-8" />
            </div>
            <div className="stat-title">Pending</div>
            <div className="stat-value text-warning">{stats.pending}</div>
            <div className="stat-desc">Keep going!</div>
          </div>

          <div className="stat bg-base-100 rounded-xl shadow-lg border border-error/10">
            <div className="stat-figure text-error">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="stat-title">Overdue</div>
            <div className="stat-value text-error">{stats.overdue}</div>
            <div className="stat-desc">Needs attention</div>
          </div>
        </div>

        {/* Progress Overview */}
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
                 completionRate >= 60 ? 'Good progress! 💪' :
                 completionRate >= 40 ? 'Keep it up! 📈' : 
                 'Let\'s get started! 🎯'}
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
                  Create New Task
                </button>
                
                <button className="btn btn-outline w-full gap-2">
                  <Calendar className="w-4 h-4" />
                  View Calendar
                </button>
                
                <button className="btn btn-outline w-full gap-2">
                  <BarChart3 className="w-4 h-4" />
                  View Reports
                </button>
              </div>
            </div>
          </div>

          {/* Achievement */}
          <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 shadow-xl">
            <div className="card-body">
              <h3 className="card-title flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Achievement
              </h3>
              
              <div className="text-center">
                <div className="text-4xl mb-2">🏆</div>
                <h4 className="font-bold">Task Master</h4>
                <p className="text-sm text-base-content/70">
                  Completed {stats.completed} tasks
                </p>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span>Next: Productivity Pro</span>
                  <span>{Math.min(stats.completed, 50)}/50</span>
                </div>
                <progress 
                  className="progress progress-primary w-full" 
                  value={Math.min(stats.completed, 50)} 
                  max="50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Task Overview Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Recent Activity */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title flex items-center gap-2">
                <Activity className="w-5 h-5 text-info" />
                Recent Activity
              </h3>
              
              {recentTasks.length > 0 ? (
                <div className="space-y-3">
                  {recentTasks.map((task) => (
                    <div key={task._id} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                        task.status === 'completed' ? 'bg-success' : 'bg-warning'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium truncate ${
                          task.status === 'completed' ? 'line-through text-base-content/60' : ''
                        }`}>{task.title}</p>
                        <p className="text-xs text-base-content/60">
                          Created {new Date(task.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={`badge badge-sm ${
                        task.status === 'completed' ? 'badge-success' : 'badge-warning'
                      }`}>
                        {task.status}
                      </div>
                    </div>
                  ))}
                  <div className="text-center pt-2">
                    <button 
                      onClick={() => setShowTaskForm(true)}
                      className="btn btn-ghost btn-sm gap-2 text-primary"
                    >
                      <Plus className="w-4 h-4" />
                      Add New Task
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-base-content/60">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="font-medium">No recent activity</p>
                  <p className="text-sm mb-4">Create your first task to get started!</p>
                  <button 
                    onClick={() => setShowTaskForm(true)}
                    className="btn btn-primary btn-sm gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create First Task
                  </button>
                </div>
              )}
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
                  <button 
                    onClick={() => setShowTaskForm(true)}
                    className="btn btn-outline btn-sm gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Plan Ahead
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full Task List */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between mb-6">
              <h3 className="card-title">All Tasks</h3>
              <button 
                onClick={() => setShowTaskForm(true)}
                className="btn btn-primary gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>
            
            <TaskList />
          </div>
        </div>
      </div>

      {/* Task Creation Modal */}
      {showTaskForm && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <TaskForm onClose={() => setShowTaskForm(false)} />
          </div>
          <div className="modal-backdrop" onClick={() => setShowTaskForm(false)} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
