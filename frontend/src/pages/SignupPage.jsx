import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, CheckSquare, User, ArrowLeft, Check, Shield, Zap, Users } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left side - Form */}
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
            {/* Logo & Progress */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
                  <CheckSquare className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Join TaskTracker
                  </h1>
                  <p className="text-base-content/60 mt-2">
                    Start organizing your life in minutes
                  </p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-xs text-primary font-medium">Create Account</span>
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
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-base-200/50">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {benefit.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{benefit.title}</p>
                    <p className="text-xs text-base-content/60">{benefit.description}</p>
                  </div>
                  <Check className="w-4 h-4 text-success flex-shrink-0" />
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                  <span className="label-text-alt text-error">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
                  <input
                    type="text"
                    className="input input-bordered w-full pl-10 focus:input-primary"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                  <span className="label-text-alt text-error">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
                  <input
                    type="email"
                    className="input input-bordered w-full pl-10 focus:input-primary"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                  <span className="label-text-alt text-error">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-10 pr-10 focus:input-primary"
                    placeholder="Create a strong password"
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
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Minimum 6 characters
                  </span>
                </label>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-full gap-2 h-12" 
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
              <p className="text-xs text-base-content/60 mb-4">
                By creating an account, you agree to our{" "}
                <a href="#" className="link link-primary">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="link link-primary">Privacy Policy</a>
              </p>
              
              <div className="divider text-base-content/40">OR</div>
              
              <p className="text-base-content/60">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Enhanced Image Pattern */}
        <div className="hidden lg:flex relative bg-gradient-to-br from-primary to-secondary overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
            <div className="max-w-md text-center">
              <h2 className="text-4xl font-bold mb-6">
                Welcome to the Future of Productivity
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join over 10,000+ professionals who have transformed their workflow with our powerful task management platform.
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold">10,000+</div>
                  <div className="text-sm text-white/80">Active Users</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold">99.9%</div>
                  <div className="text-sm text-white/80">Uptime</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold">4.9★</div>
                  <div className="text-sm text-white/80">User Rating</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-white/80">Support</div>
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
export default SignUpPage;