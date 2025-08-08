import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Menu, X, Sun, Moon } from 'lucide-react';

const LandingNavbar = ({ 
  theme, 
  toggleTheme, 
  isMenuOpen, 
  setIsMenuOpen 
}) => {
  return (
    <nav className={`navbar backdrop-blur-lg border-b sticky top-0 z-50 shadow-sm transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900/95 border-gray-700' 
        : 'bg-white/95 border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity duration-200">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg sm:rounded-xl shadow-lg">
                <CheckSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent hidden sm:inline">
                TaskTracker
              </span>
            </Link>
          </div>
          
          {/* Center Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-6">
            <a href="#features" className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              theme === 'dark' 
                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}>Features</a>
            <a href="#testimonials" className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              theme === 'dark' 
                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}>Testimonials</a>
          </div>
          
          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Auth buttons - Hidden on small screens */}
            <div className="hidden sm:flex items-center gap-2">
              <Link 
                to="/login" 
                className={`btn btn-ghost font-medium transition-all duration-200 ${
                  theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="btn bg-gradient-to-r from-purple-600 to-purple-800 text-white border-0 hover:from-purple-700 hover:to-purple-900 shadow-lg"
              >
                Sign Up
              </Link>
            </div>
            
            {/* Theme Toggle - Hidden on mobile */}
            <button
              onClick={toggleTheme}
              className={`hidden sm:btn sm:btn-ghost sm:btn-circle transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className={`lg:hidden border-t transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
        }`}>
          <div className="px-4 py-4 space-y-2">
            <nav className="space-y-1">
              <ul>
                <li><a href="#features" className={`block py-3 px-4 rounded-lg font-medium transition-all ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`} onClick={() => setIsMenuOpen(false)}>Features</a></li>
                <li><a href="#testimonials" className={`block py-3 px-4 rounded-lg font-medium transition-all ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`} onClick={() => setIsMenuOpen(false)}>Testimonials</a></li>
              </ul>
            </nav>
            
            <div className="pt-4 space-y-2">
              <Link 
                to="/login" 
                className={`block py-3 px-4 text-center rounded-lg font-medium transition-all ${
                  theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="block py-3 px-4 text-center bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-medium shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
              
              <button
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
