import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';
import { 
  User, 
  Mail, 
  Camera, 
  Bell, 
  Shield, 
  Palette, 
  Save, 
  Edit3,
  Upload,
  Settings,
  CheckCircle,
  AlertCircle,
  Eye,
  Lock,
  Trash2,
  Calendar,
  Globe,
  CheckSquare,
  Monitor,
  Smartphone,
  Volume2,
  VolumeX
} from 'lucide-react';
import toast from 'react-hot-toast';

const SettingsPage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  
  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    fullName: authUser?.fullName || '',
    email: authUser?.email || ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    dueDateReminders: true,
    overdueAlerts: true,
    weeklyReports: false,
    browserNotifications: true,
    soundNotifications: false,
    autoSave: true,
    compactView: false,
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    tasksPerPage: 10
  });

  useEffect(() => {
    // Update form data when authUser changes
    if (authUser) {
      setProfileFormData({
        fullName: authUser.fullName || '',
        email: authUser.email || ''
      });
    }
  }, [authUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (!profileFormData.fullName.trim()) {
      toast.error('Full name is required');
      return;
    }

    try {
      await updateProfile({
        fullName: profileFormData.fullName,
        profilePic: imagePreview // send base64 string
      });
      setIsEditingProfile(false);
      setSelectedImage(null);
      setImagePreview(null);
    } catch (error) {
    }
  };

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    toast.success('Settings updated');
  };

  const formatJoinDate = (createdAt) => {
    if (!createdAt) return 'Recently';
    
    try {
      return new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 pt-16 sm:pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content mb-2 flex items-center justify-center gap-2 sm:gap-3">
            <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            Account Settings
          </h1>
          <p className="text-base sm:text-lg text-base-content/70 px-4 sm:px-0">
            Manage your profile, preferences, and account security
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          
          {/* Profile Section - Takes 2 columns */}
          <div className="xl:col-span-2">
            <div className="card bg-base-100 shadow-xl border border-primary/10">
              <div className="card-body p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-4 sm:mb-6 gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 sm:gap-3">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    Profile Information
                  </h2>
                  {!isEditingProfile && (
                    <button 
                      onClick={() => setIsEditingProfile(true)}
                      className="btn btn-primary btn-sm gap-2 w-full sm:w-auto"
                    >
                      <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                      Edit Profile
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  /* Edit Mode */
                  <form onSubmit={handleProfileSubmit} className="space-y-4 sm:space-y-6">
                    {/* Profile Picture Upload */}
                    <div className="flex flex-col items-center gap-4 sm:gap-6">
                      <div className="relative">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-primary/20">
                          <img 
                            src={imagePreview || authUser?.profilePic || "/avatar.png"} 
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <label className="absolute -bottom-2 -right-2 btn btn-circle btn-xs sm:btn-sm btn-primary cursor-pointer">
                          <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                      
                      <div className="flex-1 w-full text-center">
                        <h3 className="font-semibold text-base sm:text-lg mb-2">Change Profile Picture</h3>
                        <p className="text-xs sm:text-sm text-base-content/60 mb-3">
                          Upload a new profile picture. Max size: 5MB
                        </p>
                        {selectedImage && (
                          <div className="alert alert-success alert-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">New image selected</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Full Name *</span>
                        </label>
                        <input 
                          type="text" 
                          value={profileFormData.fullName}
                          onChange={(e) => setProfileFormData(prev => ({
                            ...prev, 
                            fullName: e.target.value
                          }))}
                          className="input input-bordered w-full"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Email Address</span>
                        </label>
                        <input 
                          type="email" 
                          value={profileFormData.email}
                          className="input input-bordered w-full bg-base-200"
                          disabled
                        />
                        <label className="label">
                          <span className="label-text-alt text-base-content/60">
                            Email cannot be changed for security reasons
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button 
                        type="submit" 
                        className="btn btn-primary gap-2"
                        disabled={isUpdatingProfile}
                      >
                        {isUpdatingProfile ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          setIsEditingProfile(false);
                          setSelectedImage(null);
                          setImagePreview(null);
                          setProfileFormData({
                            fullName: authUser?.fullName || '',
                            email: authUser?.email || ''
                          });
                        }}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  /* View Mode */
                  <div className="space-y-6">
                    {/* Profile Display */}
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
                        <img 
                          src={authUser?.profilePic || "/avatar.png"} 
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-2xl font-bold text-base-content">
                          {authUser?.fullName || 'User'}
                        </h3>
                        <p className="text-base-content/70 flex items-center gap-2 justify-center sm:justify-start mt-1">
                          <Mail className="w-4 h-4" />
                          {authUser?.email}
                        </p>
                        <p className="text-sm text-base-content/60 flex items-center gap-2 justify-center sm:justify-start mt-2">
                          <Calendar className="w-4 h-4" />
                          Member since {formatJoinDate(authUser?.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Account Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                      <div className="stat bg-primary/5 rounded-lg p-4">
                        <div className="stat-title text-xs">Account Status</div>
                        <div className="stat-value text-sm text-success">Active</div>
                      </div>
                      <div className="stat bg-secondary/5 rounded-lg p-4">
                        <div className="stat-title text-xs">Profile</div>
                        <div className="stat-value text-sm text-primary">Complete</div>
                      </div>
                      <div className="stat bg-accent/5 rounded-lg p-4 col-span-2 sm:col-span-1">
                        <div className="stat-title text-xs">Security</div>
                        <div className="stat-value text-sm text-warning">Good</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Settings Sidebar - Takes remaining 2 columns */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Theme Settings */}
            <div className="card bg-base-100 shadow-xl border border-secondary/10">
              <div className="card-body">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <Palette className="w-5 h-5 text-secondary" />
                  Appearance
                </h3>
                
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <span className="label-text font-medium">Dark Mode</span>
                      <input 
                        type="checkbox" 
                        className="toggle toggle-secondary" 
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                      />
                    </label>
                    <span className="text-xs text-base-content/60 mt-1">
                      Switch between light and dark themes
                    </span>
                  </div>
                  
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <span className="label-text font-medium">Compact View</span>
                      <input 
                        type="checkbox" 
                        className="toggle toggle-secondary" 
                        checked={settings.compactView}
                        onChange={(e) => handleSettingChange('compactView', e.target.checked)}
                      />
                    </label>
                    <span className="text-xs text-base-content/60 mt-1">
                      Show more content in less space
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="card bg-base-100 shadow-xl border border-info/10">
              <div className="card-body">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <Bell className="w-5 h-5 text-info" />
                  Notifications
                </h3>
                
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <span className="label-text font-medium">Email notifications</span>
                      <input 
                        type="checkbox" 
                        className="toggle toggle-info" 
                        checked={settings.emailNotifications}
                        onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                      />
                    </label>
                    <span className="text-xs text-base-content/60 mt-1">
                      Receive email alerts for updates
                    </span>
                  </div>
                  
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <span className="label-text font-medium">Due date reminders</span>
                      <input 
                        type="checkbox" 
                        className="toggle toggle-info" 
                        checked={settings.dueDateReminders}
                        onChange={(e) => handleSettingChange('dueDateReminders', e.target.checked)}
                      />
                    </label>
                    <span className="text-xs text-base-content/60 mt-1">
                      24 hours before tasks are due
                    </span>
                  </div>
                  
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <span className="label-text font-medium">Browser notifications</span>
                      <input 
                        type="checkbox" 
                        className="toggle toggle-info" 
                        checked={settings.browserNotifications}
                        onChange={(e) => handleSettingChange('browserNotifications', e.target.checked)}
                      />
                    </label>
                    <span className="text-xs text-base-content/60 mt-1">
                      Show notifications in browser
                    </span>
                  </div>

                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <span className="label-text font-medium">Sound notifications</span>
                      <input 
                        type="checkbox" 
                        className="toggle toggle-info" 
                        checked={settings.soundNotifications}
                        onChange={(e) => handleSettingChange('soundNotifications', e.target.checked)}
                      />
                    </label>
                    <span className="text-xs text-base-content/60 mt-1">
                      Play sounds for notifications
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="card bg-base-100 shadow-xl border border-warning/10">
              <div className="card-body">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-warning" />
                  Security & Privacy
                </h3>
                
                <div className="space-y-3">
                  <button className="btn btn-outline btn-sm w-full gap-2">
                    <Lock className="w-4 h-4" />
                    Change Password
                  </button>
                  
                  <button className="btn btn-outline btn-sm w-full gap-2">
                    <Eye className="w-4 h-4" />
                    Privacy Settings
                  </button>
                  
                  <button className="btn btn-outline btn-sm w-full gap-2">
                    <CheckSquare className="w-4 h-4" />
                    Two-Factor Auth
                  </button>
                  
                  <div className="divider my-2"></div>
                  
                  <button className="btn btn-outline btn-error btn-sm w-full gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>

            {/* General Preferences */}
            <div className="card bg-base-100 shadow-xl border border-accent/10">
              <div className="card-body">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-accent" />
                  General Preferences
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Language</span>
                    </label>
                    <select 
                      className="select select-bordered w-full"
                      value={settings.language}
                      onChange={(e) => handleSettingChange('language', e.target.value)}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Date Format</span>
                    </label>
                    <select 
                      className="select select-bordered w-full"
                      value={settings.dateFormat}
                      onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Tasks Per Page</span>
                    </label>
                    <select 
                      className="select select-bordered w-full"
                      value={settings.tasksPerPage}
                      onChange={(e) => handleSettingChange('tasksPerPage', parseInt(e.target.value))}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <span className="label-text font-medium">Auto-save</span>
                      <input 
                        type="checkbox" 
                        className="toggle toggle-accent" 
                        checked={settings.autoSave}
                        onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                      />
                    </label>
                    <span className="text-xs text-base-content/60 mt-1">
                      Automatically save changes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
