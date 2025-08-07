import React, { useState, useEffect } from 'react';
import { Search, Filter, SortAsc, SortDesc, Grid, List, CheckCircle, Clock, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import TaskCard from './TaskCard';
import { useTaskStore } from '../store/useTaskStore';

const TaskList = ({ filterStatus: externalFilterStatus = 'all', onFilterChange }) => {
  const { tasks, getTasks, pagination, isTasksLoading } = useTaskStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  // Use external filter directly instead of local state
  const filterStatus = externalFilterStatus;
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');

  const sortOptions = [
    { value: 'dueDate', label: 'Due Date' },
    { value: 'createdAt', label: 'Created Date' },
    { value: 'title', label: 'Title' },
    { value: 'priority', label: 'Priority' }
  ];

  const priorities = ['Low', 'Medium', 'High'];
  const categories = ['Work', 'Personal', 'Health', 'Study', 'Finance', 'Other'];

  useEffect(() => {
    getTasks(currentPage);
  }, [currentPage, getTasks]);

  // Handle filter status change
  const handleFilterStatusChange = (newStatus) => {
    if (onFilterChange) {
      onFilterChange(newStatus);
    }
  };

  // Filter and sort tasks
  const filteredAndSortedTasks = React.useMemo(() => {
    let filtered = tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesStatus = true;
      if (filterStatus === 'overdue') {
        const isOverdue = task.status === 'pending' && new Date(task.dueDate) < new Date();
        matchesStatus = isOverdue;
      } else if (filterStatus !== 'all') {
        matchesStatus = task.status === filterStatus;
      }
      
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });

    // Sort tasks
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'dueDate':
          aValue = new Date(a.dueDate);
          bValue = new Date(b.dueDate);
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'priority': {
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          aValue = priorityOrder[a.priority] || 0;
          bValue = priorityOrder[b.priority] || 0;
          break;
        }
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [tasks, searchTerm, filterStatus, filterPriority, filterCategory, sortBy, sortOrder]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setSearchTerm('');
    handleFilterStatusChange('all');
    setFilterPriority('all');
    setFilterCategory('all');
    setSortBy('dueDate');
    setSortOrder('asc');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (filterStatus !== 'all') count++;
    if (filterPriority !== 'all') count++;
    if (filterCategory !== 'all') count++;
    return count;
  };

  if (isTasksLoading && tasks.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/60">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters Header */}
      <div className="bg-base-100 rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-10 pr-4"
            />
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <select
              value={filterStatus}
              onChange={(e) => handleFilterStatusChange(e.target.value)}
              className="select select-bordered select-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="select select-bordered select-sm"
            >
              <option value="all">All Priority</option>
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="select select-bordered select-sm"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select select-bordered select-sm flex-1"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="btn btn-outline btn-sm"
                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
              >
                {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="join">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`btn btn-sm join-item ${viewMode === 'grid' ? 'btn-active' : 'btn-outline'}`}
                  title="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`btn btn-sm join-item ${viewMode === 'list' ? 'btn-active' : 'btn-outline'}`}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Summary and Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-base-content/60">
                {filteredAndSortedTasks.length} of {tasks.length} tasks
              </span>
              {filterStatus !== 'all' && (
                <span className={`badge badge-sm ${
                  filterStatus === 'completed' ? 'badge-success' : 
                  filterStatus === 'overdue' ? 'badge-error' : 
                  filterStatus === 'pending' ? 'badge-warning' : 'badge-info'
                }`}>
                  Filter: {filterStatus}
                </span>
              )}
              {getActiveFiltersCount() > 0 && (
                <div className="flex items-center gap-2">
                  <span className="badge badge-primary badge-sm">
                    {getActiveFiltersCount()} filter{getActiveFiltersCount() > 1 ? 's' : ''} active
                  </span>
                  <button
                    onClick={clearFilters}
                    className="btn btn-ghost btn-xs"
                  >
                    Clear
                  </button>
                </div>
              )}
              {filterStatus !== 'all' && (
                <div className="badge badge-info badge-sm">
                  Status: {filterStatus === 'overdue' ? 'Overdue' : filterStatus}
                </div>
              )}
              {filterPriority !== 'all' && (
                <div className="badge badge-warning badge-sm">
                  Priority: {filterPriority}
                </div>
              )}
              {filterCategory !== 'all' && (
                <div className="badge badge-success badge-sm">
                  Category: {filterCategory}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Grid/List */}
      {filteredAndSortedTasks.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-sm mx-auto">
            <div className="mb-6">
              {searchTerm || getActiveFiltersCount() > 0 ? (
                <Filter className="w-16 h-16 mx-auto text-base-content/20" />
              ) : (
                <CheckCircle className="w-16 h-16 mx-auto text-base-content/20" />
              )}
            </div>
            <h3 className="text-xl font-bold text-base-content/60 mb-2">
              {searchTerm || getActiveFiltersCount() > 0 ? 'No tasks found' : 'No tasks yet'}
            </h3>
            <p className="text-base-content/40 mb-6">
              {searchTerm || getActiveFiltersCount() > 0 
                ? 'Try adjusting your search criteria or filters'
                : 'Create your first task to get started'
              }
            </p>
            {(searchTerm || getActiveFiltersCount() > 0) && (
              <button
                onClick={clearFilters}
                className="btn btn-outline btn-sm"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {filteredAndSortedTasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isTasksLoading}
            className="btn btn-outline btn-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          
          <div className="flex items-center gap-1">
            {[...Array(pagination.totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                disabled={isTasksLoading}
                className={`btn btn-sm ${
                  currentPage === index + 1 ? 'btn-primary' : 'btn-outline'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.totalPages || isTasksLoading}
            className="btn btn-outline btn-sm"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
