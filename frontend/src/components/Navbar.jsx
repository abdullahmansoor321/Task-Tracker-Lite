import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';
import { LogOut, User, Settings, Moon, Sun, CheckSquare, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const isActivePath = (path) => location.pathname === path;

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50 border-b border-base-200">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl text-primary font-bold flex items-center gap-2">
          <CheckSquare className="w-6 h-6" />
          <span className="hidden sm:inline">TaskTracker</span>
          <span className="sm:hidden">TT</span>
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link 
              to="/" 
              className={`btn btn-ghost gap-2 ${isActivePath('/') ? 'btn-active' : ''}`}
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/settings" 
              className={`btn btn-ghost gap-2 ${isActivePath('/settings') ? 'btn-active' : ''}`}
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="navbar-end gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>

        {/* User Menu Dropdown */}
        <div className="dropdown dropdown-end">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-ghost btn-circle avatar hover:bg-primary/10 transition-colors"
          >
            <div className="w-8 rounded-full ring-2 ring-primary/20">
              <img 
                alt="User avatar" 
                src={authUser?.profilePic || '/avatar.png'} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <ul 
            tabIndex={0} 
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-64 border border-base-200"
          >
            {/* User Info */}
            <li className="menu-title px-4 py-2">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img 
                      src={authUser?.profilePic || '/avatar.png'} 
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-base-content truncate">
                    {authUser?.fullName}
                  </div>
                  <div className="text-xs text-base-content/60 truncate">
                    {authUser?.email}
                  </div>
                </div>
              </div>
            </li>
            
            <div className="divider my-1"></div>
            
            {/* Mobile Navigation */}
            <li className="lg:hidden">
              <Link 
                to="/" 
                className={`flex items-center gap-3 ${isActivePath('/') ? 'active' : ''}`}
              >
                <Home className="w-4 h-4" />
                Dashboard
              </Link>
            </li>
            
            <li>
              <Link 
                to="/settings" 
                className={`flex items-center gap-3 ${isActivePath('/settings') ? 'active' : ''}`}
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </li>
            
            <div className="divider my-1"></div>
            
            <li>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 text-error hover:bg-error/10"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;