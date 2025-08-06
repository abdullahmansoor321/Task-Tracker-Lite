import React, { useState, useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { X, Plus, CalendarDays, Tag, AlertCircle, Save } from 'lucide-react';

const TaskForm = ({ onClose, taskToEdit = null }) => {
  const { createTask, updateTask, isCreatingTask, isUpdatingTask } = useTaskStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    category: 'Work',
    dueDate: ''
  });

  const [errors, setErrors] = useState({});

  // Initialize form data when component mounts or taskToEdit changes
  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        priority: taskToEdit.priority || 'Medium',
        category: taskToEdit.category || 'Work',
        dueDate: taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : ''
      });
    } else {
      // Set default due date to tomorrow for new tasks
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setFormData(prev => ({
        ...prev,
        dueDate: tomorrow.toISOString().split('T')[0]
      }));
    }
  }, [taskToEdit]);

  const priorities = [
    { value: 'Low', color: 'badge-success', icon: '🟢' },
    { value: 'Medium', color: 'badge-warning', icon: '🟡' },
    { value: 'High', color: 'badge-error', icon: '🔴' }
  ];

  const categories = [
    { value: 'Work', icon: '💼' },
    { value: 'Personal', icon: '🏠' },
    { value: 'Health', icon: '🏃' },
    { value: 'Study', icon: '📚' },
    { value: 'Finance', icon: '💰' },
    { value: 'Other', icon: '📝' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (taskToEdit) {
        await updateTask(taskToEdit._id, formData);
      } else {
        await createTask(formData);
      }
      
      onClose && onClose();
    } catch (error) {
      console.error('Task operation failed:', error);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-base-content">
            {taskToEdit ? 'Edit Task' : 'Create New Task'}
          </h2>
          <p className="text-base-content/60 mt-1">
            {taskToEdit ? 'Update your task details' : 'Add a new task to your list'}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Task Title *</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter task title..."
            className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
            maxLength="100"
          />
          {errors.title && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.title}
              </span>
            </label>
          )}
          <label className="label">
            <span className="label-text-alt text-base-content/60">
              {formData.title.length}/100 characters
            </span>
          </label>
        </div>

        {/* Description Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium flex items-center gap-2">
              📝 Description
            </span>
            <span className="label-text-alt text-base-content/50">Optional</span>
          </label>
          <div className="relative">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your task in detail... What needs to be done? Any specific requirements or notes?"
              className="textarea textarea-bordered min-h-[120px] resize-y leading-relaxed text-base p-4 focus:textarea-primary"
              maxLength="500"
            />
            <div className="absolute bottom-3 right-3 text-xs text-base-content/40 bg-base-100 px-2 py-1 rounded">
              {formData.description.length}/500
            </div>
          </div>
          <label className="label">
            <span className="label-text-alt text-base-content/60">
              💡 Tip: Add details, deadlines, or resources needed for this task
            </span>
          </label>
        </div>

        {/* Priority and Category Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Priority Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Priority
              </span>
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="select select-bordered w-full"
            >
              {priorities.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.icon} {priority.value}
                </option>
              ))}
            </select>
          </div>

          {/* Category Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Category
              </span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="select select-bordered w-full"
            >
              <option value="">Select category...</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.icon} {category.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Due Date Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Due Date *
            </span>
          </label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
            className={`input input-bordered w-full ${errors.dueDate ? 'input-error' : ''}`}
          />
          {errors.dueDate && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.dueDate}
              </span>
            </label>
          )}
          <label className="label">
            <span className="label-text-alt text-base-content/60">
              Quick set: 
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, dueDate: new Date().toISOString().split('T')[0] }))}
                className="link link-primary ml-1"
              >
                Today
              </button>
              {' | '}
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, dueDate: getTomorrowDate() }))}
                className="link link-primary"
              >
                Tomorrow
              </button>
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={isCreatingTask || isUpdatingTask}
            className="btn btn-primary flex-1 gap-2"
          >
            {(isCreatingTask || isUpdatingTask) ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {taskToEdit ? 'Update Task' : 'Create Task'}
              </>
            )}
          </button>
          
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline flex-1"
              disabled={isCreatingTask || isUpdatingTask}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
