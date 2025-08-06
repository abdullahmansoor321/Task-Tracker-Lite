import { CheckSquare, Circle, Calendar, Plus, Bell, Eye, User, Shield } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-base text-base-content/70">Customize your task tracker experience</p>
        </div>
        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notifications Settings */}
          <div className="card bg-base-100 shadow-lg border border-base-300">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Notifications</h3>
              </div>
              <p className="text-sm text-base-content/70 mb-6">
                Manage how you receive updates about your tasks and deadlines
              </p>
              
              <div className="space-y-4">
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text font-medium">Email notifications</span>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </label>
                  <span className="text-xs text-base-content/60 mt-1">
                    Receive email alerts for due dates and task updates
                  </span>
                </div>
                
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text font-medium">Due date reminders</span>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </label>
                  <span className="text-xs text-base-content/60 mt-1">
                    Get notified 24 hours before tasks are due
                  </span>
                </div>
                
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text font-medium">Overdue alerts</span>
                    <input type="checkbox" className="toggle toggle-warning" defaultChecked />
                  </label>
                  <span className="text-xs text-base-content/60 mt-1">
                    Daily reminders for overdue tasks
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div className="card bg-base-100 shadow-lg border border-base-300">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Display</h3>
              </div>
              <p className="text-sm text-base-content/70 mb-6">
                Customize how your tasks and interface are displayed
              </p>
              
              <div className="space-y-4">
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text font-medium">Show completed tasks</span>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </label>
                  <span className="text-xs text-base-content/60 mt-1">
                    Display completed tasks in your task list
                  </span>
                </div>
                
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text font-medium">Compact view</span>
                    <input type="checkbox" className="toggle toggle-primary" />
                  </label>
                  <span className="text-xs text-base-content/60 mt-1">
                    Show more tasks in less space
                  </span>
                </div>
                
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text font-medium">Auto-hide descriptions</span>
                    <input type="checkbox" className="toggle toggle-primary" />
                  </label>
                  <span className="text-xs text-base-content/60 mt-1">
                    Only show descriptions on hover or click
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="card bg-base-100 shadow-lg border border-base-300">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Account</h3>
              </div>
              <p className="text-sm text-base-content/70 mb-6">
                Manage your account settings and profile information
              </p>
              
              <div className="space-y-4">
                <button className="btn btn-outline w-full justify-start">
                  <User className="w-4 h-4" />
                  Edit Profile
                </button>
                
                <button className="btn btn-outline w-full justify-start">
                  <Shield className="w-4 h-4" />
                  Change Password
                </button>
                
                <div className="divider"></div>
                
                <button className="btn btn-error btn-outline w-full justify-start">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* Task Management Settings */}
          <div className="card bg-base-100 shadow-lg border border-base-300">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <CheckSquare className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Task Management</h3>
              </div>
              <p className="text-sm text-base-content/70 mb-6">
                Configure default behavior for task creation and management
              </p>
              
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Default due date</span>
                  </label>
                  <select className="select select-bordered w-full">
                    <option>No default</option>
                    <option>Tomorrow</option>
                    <option>Next week</option>
                    <option>Next month</option>
                  </select>
                </div>
                
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text font-medium">Auto-save drafts</span>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </label>
                  <span className="text-xs text-base-content/60 mt-1">
                    Automatically save task drafts while typing
                  </span>
                </div>
                
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text font-medium">Smart suggestions</span>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </label>
                  <span className="text-xs text-base-content/60 mt-1">
                    Show helpful tips and suggestions while creating tasks
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
          <div className="card-body">
            <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
            <p className="text-base-content/70 mb-4">
              Check out our documentation or contact support for assistance with your task tracker.
            </p>
            <div className="flex gap-3">
              <button className="btn btn-primary btn-sm">
                View Documentation
              </button>
              <button className="btn btn-outline btn-sm">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;