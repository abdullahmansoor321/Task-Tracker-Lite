import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, CheckSquare, ArrowLeft, Shield, Zap, Clock } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Form */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative">
          {/* Back to landing */}
          <Link 
            to="/" 
            className="absolute top-6 left-6 btn btn-ghost btn-sm gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
                  <CheckSquare className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Welcome Back
                  </h1>
                  <p className="text-base-content/60 mt-2">
                    Sign in to continue your productivity journey
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Features */}
            <div className="bg-base-200/50 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-sm mb-3 text-center">What's waiting for you:</h3>
              <div className="space-y-2">
                {quickFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <span className="text-base-content/80">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
                  <input
                    type="email"
                    className="input input-bordered w-full pl-10 focus:input-primary"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                  <Link to="/forgot-password" className="label-text-alt link link-primary text-xs">
                    Forgot password?
                  </Link>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-10 pr-10 focus:input-primary"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-base-content/40" />
                    ) : (
                      <Eye className="w-5 h-5 text-base-content/40" />
                    )}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-full gap-2 h-12" 
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
              <div className="divider text-base-content/40">OR</div>
              <p className="text-base-content/60">
                Don't have an account?{" "}
                <Link to="/signup" className="link link-primary font-medium">
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Enhanced Visual */}
        <div className="hidden lg:flex relative bg-gradient-to-br from-primary to-secondary overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
            <div className="max-w-md text-center">
              <h2 className="text-4xl font-bold mb-6">
                Continue Where You Left Off
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Your tasks are waiting. Jump back into your productivity flow and accomplish more today.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <CheckSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold">Sarah's Tasks</div>
                      <div className="text-sm text-white/80">12 active, 8 completed today</div>
                    </div>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold">This Week's Progress</div>
                      <div className="text-sm text-white/80">45 tasks completed</div>
                    </div>
                  </div>
                  <div className="text-sm text-white/90">You're 23% more productive than last week! 🎉</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Animated Background Elements */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-20 left-10 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-20 w-12 h-12 bg-white/10 rounded-full animate-ping"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;