import React, { useState } from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import { useTaskStore } from '../store/useTaskStore';
import toast from 'react-hot-toast';
import { isTaskOverdue, getDaysUntilDue, getPriorityColor, getCategoryIcon } from '../lib/taskUtils';

const TaskCard = ({ task, onEdit }) => {
  const { updateTask, deleteTask } = useTaskStore();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleStatusToggle = async () => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    
    // Check if trying to mark as completed with future due date
    if (newStatus === 'completed') {
      const today = new Date();
      const taskDueDate = new Date(task.dueDate);
      
      // Set time to start of day for fair comparison
      today.setHours(0, 0, 0, 0);
      taskDueDate.setHours(0, 0, 0, 0);
      
      if (taskDueDate > today) {
        toast.error('Cannot mark task as completed before its due date');
        return;
      }
    }
    
    await updateTask(task._id, { status: newStatus });
  };

  const handleDelete = async () => {
    await deleteTask(task._id);
    setShowDeleteConfirm(false);
  };

  const isOverdue = isTaskOverdue(task);
  const daysUntilDue = getDaysUntilDue(task.dueDate);

  return (
    <>
      <div className={`card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${
        task.status === 'completed' ? 'border-l-green-500 opacity-75' : 
        isOverdue ? 'border-l-red-500' : 
        daysUntilDue <= 1 ? 'border-l-orange-500' : 
        'border-l-blue-500'
      }`}>
        <div className="card-body p-3 sm:p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className={`font-bold text-sm sm:text-base truncate ${
                task.status === 'completed' ? 'line-through text-base-content/60' : ''
              }`}>
                {task.title}
              </h4>
              {task.description && (
                <p className="text-xs sm:text-sm text-base-content/70 mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit(task)}
                className="btn btn-ghost btn-xs sm:btn-sm"
                title="Edit task"
              >
                <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="btn btn-ghost btn-xs sm:btn-sm text-error"
                title="Delete task"
              >
                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 sm:mt-3">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-xs sm:text-sm">{getCategoryIcon(task.category)}</span>
              <span className={`badge badge-xs sm:badge-sm ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>
            <div className="text-xs sm:text-sm text-base-content/60">
              {isOverdue ? (
                <span className="text-error font-medium">Overdue</span>
              ) : (
                new Date(task.dueDate).toLocaleDateString()
              )}
            </div>
          </div>

          <div className="card-actions justify-end mt-2 sm:mt-3">
            <button
              onClick={handleStatusToggle}
              className={`btn btn-xs sm:btn-sm ${
                task.status === 'completed' ? 'btn-success' : 'btn-outline'
              }`}
            >
              <span className="hidden sm:inline">
                {task.status === 'completed' ? 'Completed' : 'Mark Complete'}
              </span>
              <span className="sm:hidden">
                {task.status === 'completed' ? '✓ Done' : '✓ Complete'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-md mx-4 sm:mx-auto">
            <h3 className="font-bold text-lg">Delete Task</h3>
            <p className="py-4 text-sm sm:text-base">Are you sure you want to delete "{task.title}"? This action cannot be undone.</p>
            <div className="modal-action flex-col sm:flex-row gap-2">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="btn btn-ghost btn-sm sm:btn-md w-full sm:w-auto"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="btn btn-error btn-sm sm:btn-md w-full sm:w-auto"
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

export default TaskCard;
