import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Star, Users, Clock, TrendingUp, Shield, Zap, ArrowRight, Menu, X, Play, Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Create and manage tasks in seconds with our intuitive interface",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your data is encrypted and protected with enterprise-grade security",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Track Progress",
      description: "Visualize your productivity with detailed analytics and insights",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Ready",
      description: "Perfect for individuals and teams of any size",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager at Google",
      company: "Google",
      content: "TaskTracker has completely transformed how I manage my daily workflow. The interface is intuitive, the features are powerful, and it integrates seamlessly with our existing tools. Our team's productivity has increased significantly since we started using it.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b008?w=150&h=150&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Senior Developer at Microsoft",
      company: "Microsoft",
      content: "As a developer, I need tools that don't get in my way. TaskTracker is exactly that - clean, fast, and incredibly efficient. The collaboration features are top-notch and help our distributed team stay aligned on complex projects.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Team Lead at Spotify",
      company: "Spotify",
      content: "Managing a remote team was challenging until we found TaskTracker. The progress tracking and team collaboration features are game-changers. Our productivity increased by 40% and team communication has never been better.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "2M+", label: "Tasks Completed" },
    { number: "4.9/5", label: "User Rating" }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900' 
        : 'bg-gradient-to-br from-slate-50 via-white to-purple-50'
    }`}>
      {/* Enhanced Navigation */}
      <nav className={`navbar backdrop-blur-lg border-b sticky top-0 z-50 shadow-sm transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-900/95 border-gray-700' 
          : 'bg-white/95 border-gray-100'
      }`}>
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="navbar-start">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl shadow-lg">
                <CheckSquare className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent hidden sm:inline">
                TaskTracker
              </span>
            </Link>
          </div>
          
          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-1">
              <li><a href="#features" className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:text-purple-400 hover:bg-purple-900/50' 
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
              }`}>Features</a></li>
              <li><a href="#testimonials" className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:text-purple-400 hover:bg-purple-900/50' 
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
              }`}>Reviews</a></li>
            </ul>
          </div>
          
          <div className="navbar-end gap-2">
            {/* Main navigation buttons */}
            <Link to="/login" className={`btn btn-ghost font-medium hidden sm:flex transition-all duration-200 ${
              theme === 'dark' 
                ? 'text-gray-300 hover:text-purple-400' 
                : 'text-gray-700 hover:text-purple-600'
            }`}>
              Sign In
            </Link>
            <Link to="/signup" className="btn bg-gradient-to-r from-purple-600 to-purple-800 text-white border-0 hover:from-purple-700 hover:to-purple-900 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              Get Started
            </Link>
            
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button 
                className={`btn btn-ghost btn-square transition-all duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          {/* Theme Toggle Button - Absolutely positioned at far right */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle absolute right-4 top-1/2 transform -translate-y-1/2 hidden lg:flex z-10"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className={`lg:hidden absolute top-full left-0 right-0 backdrop-blur-lg border-b shadow-lg transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-900/95 border-gray-700' 
              : 'bg-white/95 border-gray-100'
          }`}>
            <div className="container mx-auto px-4 py-4">
              <ul className="space-y-2">
                <li><a href="#features" className={`block py-3 px-4 rounded-lg font-medium transition-all ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-purple-400 hover:bg-purple-900/50' 
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`} onClick={() => setIsMenuOpen(false)}>Features</a></li>
                <li><a href="#testimonials" className={`block py-3 px-4 rounded-lg font-medium transition-all ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-purple-400 hover:bg-purple-900/50' 
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`} onClick={() => setIsMenuOpen(false)}>Reviews</a></li>
                <li><a href="#pricing" className={`block py-3 px-4 rounded-lg font-medium transition-all ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-purple-400 hover:bg-purple-900/50' 
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`} onClick={() => setIsMenuOpen(false)}>Pricing</a></li>
                <li><Link to="/login" className={`block py-3 px-4 rounded-lg font-medium transition-all ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-purple-400 hover:bg-purple-900/50' 
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`} onClick={() => setIsMenuOpen(false)}>Sign In</Link></li>
                <li>
                  <button
                    onClick={() => { toggleTheme(); setIsMenuOpen(false); }}
                    className={`flex items-center gap-3 w-full py-3 px-4 rounded-lg font-medium transition-all ${
                      theme === 'dark' 
                        ? 'text-gray-300 hover:text-purple-400 hover:bg-purple-900/50' 
                        : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          <div className={`absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float ${
            theme === 'dark' 
              ? 'bg-purple-400/30' 
              : 'bg-purple-400/20'
          }`}></div>
          <div className={`absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-delayed ${
            theme === 'dark' 
              ? 'bg-purple-600/30' 
              : 'bg-purple-600/20'
          }`}></div>
          <div className={`absolute bottom-20 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse ${
            theme === 'dark' 
              ? 'bg-purple-500/30' 
              : 'bg-purple-500/20'
          }`}></div>
          <div className={`absolute top-1/2 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-float ${
            theme === 'dark' 
              ? 'bg-purple-300/20' 
              : 'bg-purple-300/10'
          }`}></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent leading-tight">
                Get Things Done
              </span>
              <br />
              <span className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
              }`}>Beautifully Simple</span>
            </h1>
            
            {/* Subtitle */}
            <p className={`text-lg sm:text-xl lg:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              The most intuitive task tracker that helps you stay organized, focused, and productive. 
              Transform chaos into clarity with our powerful yet simple platform designed for modern professionals.
            </p>

            {/* Trust Badge - Moved down */}
            <div className="flex justify-center mb-8">
              <div className={`inline-flex items-center gap-2 px-6 py-3 backdrop-blur-sm rounded-full border shadow-lg transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-gray-800/80 border-gray-600' 
                  : 'bg-white/80 border-gray-200'
              }`}>
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Trusted by 50,000+ users worldwide</span>
              </div>
            </div>
            
            {/* CTA Buttons - Removed Demo */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
              <Link to="/signup" className="btn bg-gradient-to-r from-purple-600 to-purple-800 text-white border-0 btn-lg px-8 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 w-full sm:w-auto">
                <span>Start Free Today</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/login" className={`btn btn-outline btn-lg px-8 transition-all duration-300 w-full sm:w-auto ${
                theme === 'dark' 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}>
                Sign In
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                  }`}>{stat.number}</div>
                  <div className={`text-sm transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Features Preview */}
            <div className="text-center space-y-3">
              <p className={`text-sm transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>✓ No credit card required</p>
              <p className={`text-sm transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>✓ Free forever plan available</p>
              <p className={`text-sm transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>✓ Setup in under 2 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className={`py-20 lg:py-28 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-20">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>
              Why Choose TaskTracker?
            </h2>
            <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Designed with productivity in mind, our platform offers everything you need to stay organized and achieve your goals efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className={`rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                    : 'bg-white border-gray-100'
                }`}>
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold mb-4 text-center transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                  }`}>{feature.title}</h3>
                  <p className={`text-center leading-relaxed transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className={`py-20 lg:py-28 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-20">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>
              Loved by Professionals Worldwide
            </h2>
            <p className={`text-lg sm:text-xl leading-relaxed transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              See what industry leaders say about their productivity transformation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group">
                <div className={`rounded-2xl p-8 shadow-lg border hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-600' 
                    : 'bg-white border-gray-100'
                }`}>
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  {/* Testimonial Content */}
                  <blockquote className={`leading-relaxed mb-8 text-lg transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    "{testimonial.content}"
                  </blockquote>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className={`w-16 h-16 rounded-full object-cover ring-4 transition-all duration-300 ${
                          theme === 'dark' ? 'ring-purple-600/50' : 'ring-blue-100'
                        }`}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg items-center justify-center hidden">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div>
                      <h4 className={`font-bold text-lg transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                      }`}>{testimonial.name}</h4>
                      <p className={`transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>{testimonial.role}</p>
                      <p className={`text-sm font-medium transition-colors duration-300 ${
                        theme === 'dark' ? 'text-purple-400' : 'text-blue-600'
                      }`}>{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <div className="text-center">
            <p className={`mb-6 transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
            }`}>Trusted by teams at:</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['Google', 'Microsoft', 'Spotify', 'Netflix', 'Uber', 'Airbnb'].map((company, index) => (
                <div key={index} className={`text-xl font-bold transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join 50,000+ professionals who have revolutionized their workflow with TaskTracker. 
            Start your journey to peak productivity today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link to="/signup" className="btn bg-white text-purple-600 hover:bg-gray-100 btn-lg px-8 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 w-full sm:w-auto">
              <span className="font-semibold">Start Your Journey Today</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link to="/login" className="btn btn-outline text-white border-white hover:bg-white hover:text-purple-600 btn-lg px-8 w-full sm:w-auto">
              Sign In Now
            </Link>
          </div>
          <div className="text-sm text-white/80">
            Join 50,000+ satisfied users • No setup fees • Cancel anytime
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className={`py-16 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-900 text-white'
      }`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">TaskTracker</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Making productivity beautiful and accessible for everyone.
              </p>
            </div>
            
            {/* Product */}
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Reviews</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 TaskTracker. All rights reserved. Made with ❤️ for productivity enthusiasts worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
