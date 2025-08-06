import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera, User, Mail, Calendar, Edit3, Save, X, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || '',
    email: authUser?.email || ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName.trim()) {
      toast.error('Full name is required');
      return;
    }

    try {
      await updateProfile({
        fullName: formData.fullName,
        profilePic: selectedImage
      });
      
      setIsEditing(false);
      setSelectedImage(null);
      setImagePreview(null);
      toast.success('Profile updated successfully! 🎉');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: authUser?.fullName || '',
      email: authUser?.email || ''
    });
    setSelectedImage(null);
    setImagePreview(null);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300">
      <div className="container mx-auto pt-20 px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-base-content mb-2">
              My Profile
            </h1>
            <p className="text-base-content/60">
              Manage your account information and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body items-center text-center p-6">
                  
                  {/* Profile Picture */}
                  <div className="relative mb-6">
                    <div className="avatar">
                      <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                        <img 
                          src={imagePreview || authUser?.profilePic || '/avatar.png'} 
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 btn btn-circle btn-primary btn-sm cursor-pointer">
                        <Camera className="w-4 h-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="w-full space-y-2">
                    <h2 className="text-2xl font-bold text-base-content">
                      {authUser?.fullName}
                    </h2>
                    <p className="text-base-content/60 break-words">
                      {authUser?.email}
                    </p>
                    
                    <div className="flex items-center justify-center gap-2 text-sm text-base-content/60 mt-4">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {authUser?.createdAt ? formatDate(authUser.createdAt) : 'recently'}</span>
                    </div>
                  </div>

                  {/* Edit Button */}
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn btn-primary gap-2 mt-6"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Details & Edit Form */}
            <div className="lg:col-span-2">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body p-6">
                  <h3 className="card-title text-xl mb-6">
                    {isEditing ? 'Edit Profile Information' : 'Profile Information'}
                  </h3>

                  {isEditing ? (
                    /* Edit Form */
                    <form onSubmit={handleSubmit} className="space-y-6">
                      
                      {/* Full Name */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Full Name *
                          </span>
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          className="input input-bordered w-full"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      {/* Email (Read-only) */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Address
                          </span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          className="input input-bordered w-full bg-base-200"
                          disabled
                        />
                        <label className="label">
                          <span className="label-text-alt text-base-content/60">
                            Email cannot be changed
                          </span>
                        </label>
                      </div>

                      {/* Profile Picture Preview */}
                      {selectedImage && (
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-medium">New Profile Picture</span>
                          </label>
                          <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                            <div className="avatar">
                              <div className="w-16 rounded-full">
                                <img src={imagePreview} alt="Preview" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{selectedImage.name}</p>
                              <p className="text-sm text-base-content/60">
                                {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedImage(null);
                                setImagePreview(null);
                              }}
                              className="btn btn-ghost btn-sm btn-circle"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                          type="submit"
                          disabled={isUpdatingProfile}
                          className="btn btn-primary flex-1 gap-2"
                        >
                          {isUpdatingProfile ? (
                            <>
                              <span className="loading loading-spinner loading-sm"></span>
                              Updating...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              Save Changes
                            </>
                          )}
                        </button>
                        
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="btn btn-outline flex-1"
                          disabled={isUpdatingProfile}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Display Mode */
                    <div className="space-y-6">
                      
                      {/* Personal Information */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-base-content/60 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Full Name
                          </label>
                          <p className="text-lg font-medium text-base-content">
                            {authUser?.fullName}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-base-content/60 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Address
                          </label>
                          <p className="text-lg font-medium text-base-content break-words">
                            {authUser?.email}
                          </p>
                        </div>
                      </div>

                      {/* Account Status */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-base-content">Account Status</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="stat bg-success/10 rounded-lg p-4">
                            <div className="stat-figure text-success">
                              <CheckCircle className="w-8 h-8" />
                            </div>
                            <div className="stat-title text-success">Account Status</div>
                            <div className="stat-value text-success text-lg">Active</div>
                          </div>
                          
                          <div className="stat bg-primary/10 rounded-lg p-4">
                            <div className="stat-figure text-primary">
                              <Calendar className="w-8 h-8" />
                            </div>
                            <div className="stat-title text-primary">Member Since</div>
                            <div className="stat-value text-primary text-lg">
                              {authUser?.createdAt ? formatDate(authUser.createdAt) : 'Welcome!'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;