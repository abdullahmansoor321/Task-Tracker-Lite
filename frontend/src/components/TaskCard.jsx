import React, { useState } from 'react';
import { Calendar, Edit3, Trash2, CheckCircle, Clock, AlertTriangle, User, Tag, FileText } from 'lucide-react';
import { useTaskStore } from '../store/useTaskStore';
import TaskForm from './TaskForm';
import toast from 'react-hot-toast';

const TaskCard = ({ task }) => {
  const { updateTask, deleteTask, loading } = useTaskStore();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Reset time for comparison
    const taskDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const tomorrowDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
    
    if (taskDate.getTime() === todayDate.getTime()) {
      return 'Today';
    } else if (taskDate.getTime() === tomorrowDate.getTime()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const isOverdue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today && task.status === 'pending';
  };

  const getDueDateColor = () => {
    if (task.status === 'completed') return 'text-green-600 dark:text-green-400';
    if (isOverdue()) return 'text-red-600 dark:text-red-400';
    
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) return 'text-orange-600 dark:text-orange-400';
    if (diffDays <= 3) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-blue-600 dark:text-blue-400';
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'High': return 'badge-error';
      case 'Medium': return 'badge-warning';
      case 'Low': return 'badge-success';
      default: return 'badge-ghost';
    }
  };

  const getPriorityIcon = () => {
    switch (task.priority) {
      case 'High': return '🔴';
      case 'Medium': return '🟡';
      case 'Low': return '🟢';
      default: return '⚪';
    }
  };

  const getCategoryIcon = () => {
    switch (task.category) {
      case 'Work': return '💼';
      case 'Personal': return '🏠';
      case 'Health': return '🏃';
      case 'Study': return '📚';
      case 'Finance': return '💰';
      default: return '📝';
    }
  };

  const handleStatusToggle = async () => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      await updateTask(task._id, { status: newStatus });
      toast.success(newStatus === 'completed' ? 'Task completed! 🎉' : 'Task reopened!');
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      toast.success('Task deleted successfully');
      setShowDeleteConfirm(false);
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  return (
    <>
      <div className={`card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${
        task.status === 'completed' ? 'border-l-green-500 opacity-75' : 
        isOverdue() ? 'border-l-red-500' : 
        task.priority === 'High' ? 'border-l-red-400' :
        task.priority === 'Medium' ? 'border-l-yellow-400' : 'border-l-blue-400'
      } group hover:scale-[1.02]`}>
        <div className="card-body p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className={`font-bold text-lg leading-tight ${
                task.status === 'completed' ? 'line-through text-base-content/60' : 'text-base-content'
              }`}>
                {task.title}
              </h3>
              
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <div className={`badge ${getPriorityColor()} badge-sm gap-1`}>
                  <span>{getPriorityIcon()}</span>
                  {task.priority}
                </div>
                
                {task.category && (
                  <div className="badge badge-outline badge-sm gap-1">
                    <span>{getCategoryIcon()}</span>
                    {task.category}
                  </div>
                )}
                
                <div className={`badge badge-ghost badge-sm gap-1 ${task.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                  {task.status === 'completed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  {task.status === 'completed' ? 'Done' : 'Pending'}
                </div>
                
                {isOverdue() && (
                  <div className="badge badge-error badge-sm gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Overdue
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleStatusToggle}
                disabled={loading}
                className={`btn btn-sm btn-circle ${
                  task.status === 'completed' ? 'btn-outline' : 'btn-success'
                } hover:scale-110 transition-transform`}
                title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
              >
                <CheckCircle className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setShowEditForm(true)}
                className="btn btn-sm btn-circle btn-ghost opacity-60 group-hover:opacity-100 hover:scale-110 transition-all"
                title="Edit task"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="btn btn-sm btn-circle btn-ghost text-error opacity-60 group-hover:opacity-100 hover:scale-110 transition-all"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <div className="mb-3">
              <p className={`text-sm leading-relaxed ${
                task.status === 'completed' ? 'text-base-content/50' : 'text-base-content/70'
              }`}>
                {task.description}
              </p>
            </div>
          )}

          {/* Footer Info */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-base-200">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              <span className={`font-medium ${getDueDateColor()}`}>
                Due {formatDate(task.dueDate)}
              </span>
            </div>
            
            {task.createdBy && (
              <div className="flex items-center gap-1 text-xs text-base-content/50">
                <User className="w-3 h-3" />
                <span>by {task.createdBy.fullName}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Form Modal */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <TaskForm 
              taskToEdit={task}
              onClose={() => setShowEditForm(false)} 
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4 text-error">Delete Task</h3>
            <p className="mb-6 text-base-content/70">
              Are you sure you want to delete "<strong>{task.title}</strong>"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="btn btn-error flex-1"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  'Delete Task'
                )}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn btn-outline flex-1"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;
