import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle, Clock, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useTaskStore } from '../store/useTaskStore';
import { useAuthStore } from '../store/useAuthStore';

const HomePage = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const { tasks, getTasks, pagination } = useTaskStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getTasks(1);
  }, [getTasks]);

  // Calculate task statistics
  const totalTasks = pagination?.totalTasks || 0;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const overdueTasks = tasks.filter(task => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today && task.status === 'pending';
  }).length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300">
      <div className="container mx-auto pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Welcome Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-base-content">
                  {getGreeting()}, {authUser?.fullName?.split(' ')[0] || 'User'}! 👋
                </h1>
                <p className="text-base-content/70 mt-2">
                  {totalTasks === 0 
                    ? "Ready to start your productivity journey?"
                    : `You have ${pendingTasks} pending tasks to complete.`
                  }
                </p>
              </div>
              <button
                onClick={() => setShowTaskForm(true)}
                className="btn btn-primary gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="w-5 h-5" />
                New Task
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="stats shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <div className="stat">
                <div className="stat-figure text-white/30">
                  <Clock className="w-8 h-8" />
                </div>
                <div className="stat-title text-white/80">Total Tasks</div>
                <div className="stat-value">{totalTasks}</div>
                <div className="stat-desc text-white/70">All time tasks</div>
              </div>
            </div>
            
            <div className="stats shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
              <div className="stat">
                <div className="stat-figure text-white/30">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="stat-title text-white/80">Completed</div>
                <div className="stat-value">{completedTasks}</div>
                <div className="stat-desc text-white/70">{completionRate}% completion rate</div>
              </div>
            </div>
            
            <div className="stats shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <div className="stat">
                <div className="stat-figure text-white/30">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <div className="stat-title text-white/80">Pending</div>
                <div className="stat-value">{pendingTasks}</div>
                <div className="stat-desc text-white/70">Need attention</div>
              </div>
            </div>
            
            <div className="stats shadow-lg bg-gradient-to-br from-red-500 to-red-600 text-white">
              <div className="stat">
                <div className="stat-figure text-white/30">
                  <Calendar className="w-8 h-8" />
                </div>
                <div className="stat-title text-white/80">Overdue</div>
                <div className="stat-value">{overdueTasks}</div>
                <div className="stat-desc text-white/70">Past deadline</div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Progress */}
          {totalTasks > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title">
                      <TrendingUp className="w-5 h-5" />
                      Progress Overview
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Overall Completion</span>
                          <span>{completionRate}%</span>
                        </div>
                        <progress className="progress progress-primary w-full" value={completionRate} max="100"></progress>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-500">{completedTasks}</div>
                          <div className="text-xs text-base-content/60">Done</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-orange-500">{pendingTasks}</div>
                          <div className="text-xs text-base-content/60">In Progress</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-red-500">{overdueTasks}</div>
                          <div className="text-xs text-base-content/60">Overdue</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title">Quick Actions</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => setShowTaskForm(true)}
                      className="btn btn-primary btn-block btn-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add New Task
                    </button>
                    <button className="btn btn-outline btn-block btn-sm">
                      <CheckCircle className="w-4 h-4" />
                      View Completed
                    </button>
                    <button className="btn btn-outline btn-block btn-sm">
                      <AlertTriangle className="w-4 h-4" />
                      Show Overdue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Task Form Modal */}
          {showTaskForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-base-100 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <TaskForm onClose={() => setShowTaskForm(false)} />
              </div>
            </div>
          )}

          {/* Task List */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title mb-4">Recent Tasks</h3>
              <TaskList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;