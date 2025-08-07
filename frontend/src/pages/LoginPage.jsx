import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, CheckSquare, ArrowLeft, Shield, Zap, Clock, Sun, Moon } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    login(formData);
  };

  const quickFeatures = [
    {
      icon: <Zap className="w-4 h-4" />,
      text: "Lightning fast task creation"
    },
    {
      icon: <Shield className="w-4 h-4" />,
      text: "Secure cloud synchronization"
    },
    {
      icon: <Clock className="w-4 h-4" />,
      text: "Real-time progress tracking"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900' 
        : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
    }`}>
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Form */}
        <div className={`flex flex-col justify-center items-center p-6 sm:p-12 relative transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-900/50' : 'bg-transparent'
        }`}>
          {/* Back to landing */}
          <Link 
            to="/" 
            className={`absolute top-6 left-6 btn btn-ghost btn-sm gap-2 transition-all duration-300 ${
              theme === 'dark' 
                ? 'text-gray-300 hover:text-purple-400 hover:bg-purple-900/50' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`absolute top-6 right-6 btn btn-ghost btn-square transition-all duration-200 ${
              theme === 'dark' 
                ? 'hover:bg-purple-900/50 hover:text-purple-400 text-gray-300' 
                : 'hover:bg-purple-50 hover:text-purple-600 text-gray-700'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
                  <CheckSquare className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                    Welcome Back
                  </h1>
                  <p className={`mt-2 transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-base-content/60'
                  }`}>
                    Sign in to continue your productivity journey
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Features */}
            <div className={`rounded-xl p-4 mb-6 transition-all duration-300 ${
              theme === 'dark' ? 'bg-gray-800/50' : 'bg-base-200/50'
            }`}>
              <h3 className={`font-semibold text-sm mb-3 text-center transition-all duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-base-content'
              }`}>What's waiting for you:</h3>
              <div className="space-y-2">
                {quickFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600/10 flex items-center justify-center text-purple-600">
                      {feature.icon}
                    </div>
                    <span className={`transition-all duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-base-content/80'
                    }`}>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-control">
                <label className="label">
                  <span className={`label-text font-medium transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-base-content'
                  }`}>Email Address</span>
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-base-content/40'
                  }`} />
                  <input
                    type="email"
                    className={`input input-bordered w-full pl-10 focus:border-purple-600 focus:outline-none transition-all duration-300 ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className={`label-text font-medium transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-base-content'
                  }`}>Password</span>
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-base-content/40'
                  }`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`input input-bordered w-full pl-10 pr-10 focus:border-purple-600 focus:outline-none transition-all duration-300 ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                      theme === 'dark' ? 'text-gray-500 hover:text-gray-400' : 'text-base-content/40 hover:text-base-content/60'
                    }`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn bg-gradient-to-r from-purple-600 to-purple-800 text-white border-0 hover:from-purple-700 hover:to-purple-900 w-full gap-2 h-12" 
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <CheckSquare className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Sign up link */}
            <div className="text-center">
              <div className={`divider transition-all duration-300 ${
                theme === 'dark' ? 'text-gray-500' : 'text-base-content/40'
              }`}>OR</div>
              <p className={`transition-all duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-base-content/60'
              }`}>
                Don't have an account?{" "}
                <Link to="/signup" className="link text-purple-600 hover:text-purple-700 font-medium">
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Enhanced Visual */}
        <div className="hidden lg:flex relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-16 right-16 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-24 left-16 w-20 h-20 bg-white/10 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/3 right-32 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
          
          <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
            <div className="max-w-lg text-center">
              <h2 className="text-5xl font-bold mb-4 leading-tight">
                Continue Where You Left Off
              </h2>
              <p className="text-xl text-white/90 mb-12 leading-relaxed">
                Your tasks are waiting. Jump back into your productivity flow and accomplish more today.
              </p>
              
              <div className="space-y-6">
                {/* Personal Progress Card */}
                <div className="bg-white/15 rounded-xl p-6 backdrop-blur-sm text-left border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center">
                      <CheckSquare className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg">Your Tasks</div>
                      <div className="text-white/80">12 active, 8 completed today</div>
                    </div>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                    <div className="bg-gradient-to-r from-white to-white/80 h-3 rounded-full shadow-sm" style={{ width: '67%' }}></div>
                  </div>
                  <div className="text-sm text-white/90">67% completion rate</div>
                </div>
                
                {/* Weekly Progress Card */}
                <div className="bg-white/15 rounded-xl p-6 backdrop-blur-sm text-left border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg">This Week's Progress</div>
                      <div className="text-white/80">45 tasks completed</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📈</span>
                    <span className="text-white/90 font-medium">You're 23% more productive than last week!</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold">127</div>
                    <div className="text-sm text-white/80">Total Tasks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">94%</div>
                    <div className="text-sm text-white/80">On Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">15</div>
                    <div className="text-sm text-white/80">Streak Days</div>
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

export default LoginPage;