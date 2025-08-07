import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { Eye, EyeOff, Loader2, Lock, Mail, CheckSquare, User, ArrowLeft, Check, Shield, Zap, Users } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const { theme } = useThemeStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  const benefits = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Lightning Fast Setup",
      description: "Get started in under 2 minutes"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure & Private",
      description: "Your data is encrypted and protected"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Team Ready",
      description: "Perfect for individuals and teams"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900' 
        : 'bg-gradient-to-br from-slate-50 via-white to-purple-50'
    }`}>
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left side - Form */}
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

          <div className="w-full max-w-md space-y-8">
            {/* Logo & Progress */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
                  <CheckSquare className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                    Join TaskTracker
                  </h1>
                  <p className={`mt-2 transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-base-content/60'
                  }`}>
                    Start organizing your life in minutes
                  </p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                    <span className="text-xs text-purple-600 font-medium">Create Account</span>
                  </div>
                  <div className="w-8 h-px bg-base-300"></div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-base-300"></div>
                    <span className="text-xs text-base-content/40">Welcome Tour</span>
                  </div>
                  <div className="w-8 h-px bg-base-300"></div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-base-300"></div>
                    <span className="text-xs text-base-content/40">Start Tracking</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              {benefits.map((benefit, index) => (
                <div key={index} className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-700/50' : 'bg-base-200/50'
                }`}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600/10 flex items-center justify-center text-purple-600">
                    {benefit.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm transition-all duration-300 ${
                      theme === 'dark' ? 'text-gray-200' : 'text-base-content'
                    }`}>{benefit.title}</p>
                    <p className={`text-xs transition-all duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-base-content/60'
                    }`}>{benefit.description}</p>
                  </div>
                  <Check className="w-4 h-4 text-success flex-shrink-0" />
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-control">
                <label className="label">
                  <span className={`label-text font-medium transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-base-content'
                  }`}>Full Name</span>
                  <span className="label-text-alt text-error">*</span>
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-base-content/40'
                  }`} />
                  <input
                    type="text"
                    className={`input input-bordered w-full pl-10 focus:border-purple-600 focus:outline-none transition-all duration-300 ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className={`label-text font-medium transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-base-content'
                  }`}>Email Address</span>
                  <span className="label-text-alt text-error">*</span>
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
                    placeholder="you@example.com"
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
                  <span className="label-text-alt text-error">*</span>
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
                    placeholder="Create a strong password"
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
                <label className="label">
                  <span className={`label-text-alt transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-base-content/60'
                  }`}>
                    Minimum 6 characters
                  </span>
                </label>
              </div>

              <button 
                type="submit" 
                className="btn bg-gradient-to-r from-purple-600 to-purple-800 text-white border-0 hover:from-purple-700 hover:to-purple-900 w-full gap-2 h-12" 
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create My Account
                    <CheckSquare className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Terms */}
            <div className="text-center">
              <p className={`text-xs mb-4 transition-all duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-base-content/60'
              }`}>
                By creating an account, you agree to our{" "}
                <a href="#" className="link text-purple-600 hover:text-purple-700">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="link text-purple-600 hover:text-purple-700">Privacy Policy</a>
              </p>
              
              <div className={`divider transition-all duration-300 ${
                theme === 'dark' ? 'text-gray-500' : 'text-base-content/40'
              }`}>OR</div>
              
              <p className={`transition-all duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-base-content/60'
              }`}>
                Already have an account?{" "}
                <Link to="/login" className="link text-purple-600 hover:text-purple-700 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Enhanced Visual */}
        <div className="hidden lg:flex relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-16 right-16 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-24 left-16 w-20 h-20 bg-white/10 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/3 right-32 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
          
          <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
            <div className="max-w-lg text-center">
              <h2 className="text-5xl font-bold mb-4 leading-tight">
                Welcome to the Future of Productivity
              </h2>
              <p className="text-xl text-white/90 mb-12 leading-relaxed">
                Join 50,000+ professionals who have transformed their workflow with our powerful task management platform.
              </p>
              
              <div className="space-y-6">
                {/* Achievement Card */}
                <div className="bg-white/15 rounded-xl p-6 backdrop-blur-sm text-left border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center">
                      <CheckSquare className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg">Join Elite Users</div>
                      <div className="text-white/80">Be part of productivity revolution</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🚀</span>
                    <span className="text-white/90 font-medium">Start your journey to peak productivity today!</span>
                  </div>
                </div>
                
                {/* Success Stats Card */}
                <div className="bg-white/15 rounded-xl p-6 backdrop-blur-sm text-left border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg">Proven Results</div>
                      <div className="text-white/80">Real success stories</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📈</span>
                    <span className="text-white/90 font-medium">Users report 40% productivity increase!</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white/15 rounded-xl p-4 backdrop-blur-sm text-center border border-white/20">
                    <div className="text-2xl font-bold">50K+</div>
                    <div className="text-sm text-white/80">Happy Users</div>
                  </div>
                  <div className="bg-white/15 rounded-xl p-4 backdrop-blur-sm text-center border border-white/20">
                    <div className="text-2xl font-bold">99.9%</div>
                    <div className="text-sm text-white/80">Uptime</div>
                  </div>
                  <div className="bg-white/15 rounded-xl p-4 backdrop-blur-sm text-center border border-white/20">
                    <div className="text-2xl font-bold">4.9★</div>
                    <div className="text-sm text-white/80">Rating</div>
                  </div>
                  <div className="bg-white/15 rounded-xl p-4 backdrop-blur-sm text-center border border-white/20">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm text-white/80">Support</div>
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
export default SignUpPage;