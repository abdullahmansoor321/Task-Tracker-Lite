import React, { useState } from 'react';
import { Search, CheckCircle, Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import { getPriorityColor, getCategoryIcon, filterTasksByStatus } from '../lib/taskUtils';

const TaskList = ({ 
  tasks, 
  activeFilter, 
  onFilterChange, 
  onTaskEdit, 
  onAddTask 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter tasks based on active filters
  const getFilteredTasks = () => {
    let filtered = [...tasks];

    // Apply status filter (from cards) - use shared utility
    filtered = filterTasksByStatus(filtered, activeFilter);

    // Apply status filter (from dropdown) - use shared utility  
    if (statusFilter !== 'all') {
      filtered = filterTasksByStatus(filtered, statusFilter);
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

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between mb-6">
          <h3 className="card-title">
            Task Management 
            <span className="badge badge-neutral">{filteredTasks.length}</span>
          </h3>
          <button 
            onClick={onAddTask}
            className="btn btn-primary gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered input-sm sm:input-md w-full pl-8 sm:pl-10 text-sm sm:text-base"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-bordered select-sm sm:select-md text-sm sm:text-base"
          >
            <option value="all">All Status</option>
            <option value="pending">⏰ Pending</option>
            <option value="completed">✅ Completed</option>
            <option value="overdue">🚨 Overdue</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="select select-bordered select-sm sm:select-md text-sm sm:text-base"
          >
            <option value="all">All Priorities</option>
            <option value="High">🔴 High Priority</option>
            <option value="Medium">🟡 Medium Priority</option>
            <option value="Low">🟢 Low Priority</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="select select-bordered select-sm sm:select-md text-sm sm:text-base"
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
              onFilterChange('all');
              setSearchTerm('');
              setPriorityFilter('all');
              setCategoryFilter('all');
              setStatusFilter('all');
            }}
            className="btn btn-outline btn-sm sm:btn-md text-sm sm:text-base sm:col-span-2 lg:col-span-1"
          >
            <span className="hidden sm:inline">Clear Filters</span>
            <span className="sm:hidden">Clear</span>
          </button>
        </div>

        {/* Active Filter Indicator */}
        {(activeFilter !== 'all' || searchTerm || priorityFilter !== 'all' || categoryFilter !== 'all' || statusFilter !== 'all') && (
          <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-base-200 rounded-lg">
            <span className="text-xs sm:text-sm font-medium">Active filters:</span>
            {activeFilter !== 'all' && (
              <span className="badge badge-primary badge-sm sm:badge-md">{activeFilter}</span>
            )}
            {searchTerm && (
              <span className="badge badge-secondary badge-sm sm:badge-md">Search: {searchTerm}</span>
            )}
            {priorityFilter !== 'all' && (
              <span className="badge badge-accent badge-sm sm:badge-md">{priorityFilter} Priority</span>
            )}
            {categoryFilter !== 'all' && (
              <span className="badge badge-info badge-sm sm:badge-md">{categoryFilter}</span>
            )}
            {statusFilter !== 'all' && (
              <span className="badge badge-warning badge-sm sm:badge-md">Status: {statusFilter}</span>
            )}
          </div>
        )}

        {/* Tasks Grid */}
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredTasks.map((task) => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onEdit={onTaskEdit}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-16 px-4">
            <div className="max-w-sm mx-auto">
              <div className="mb-4 sm:mb-6">
                <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-base-content/20" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-base-content/60 mb-2">
                {tasks.length === 0 ? 'No tasks yet' : 'No tasks match your filters'}
              </h3>
              <p className="text-sm sm:text-base text-base-content/50 mb-4 sm:mb-6">
                {tasks.length === 0 
                  ? 'Create your first task to get started with your productivity journey!'
                  : 'Try adjusting your filters or create a new task.'
                }
              </p>
              <button 
                onClick={onAddTask}
                className="btn btn-primary btn-sm sm:btn-md gap-2"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-sm sm:text-base">Create Task</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;