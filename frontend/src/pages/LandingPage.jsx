import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Star, Users, Clock, TrendingUp, Shield, Zap, ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Create and manage tasks in seconds with our intuitive interface"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your data is encrypted and protected with enterprise-grade security"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Track Progress",
      description: "Visualize your productivity with detailed analytics and insights"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Ready",
      description: "Perfect for individuals and teams of any size"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager at Google",
      content: "This task tracker transformed how I manage my daily workflow. The interface is intuitive and the features are exactly what I needed to boost my productivity.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b008?w=150&h=150&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Senior Developer at Microsoft",
      content: "Finally, a task manager that doesn't get in my way! The clean design and powerful features make it perfect for managing complex projects and deadlines.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Team Lead at Spotify",
      content: "Our team productivity increased by 40% after switching to TaskTracker. The collaboration features and progress tracking are game-changers for remote teams.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5">
      {/* Navigation */}
      <nav className="navbar bg-base-100/90 backdrop-blur-lg border-b border-base-300/50 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="navbar-start">
            <Link to="/" className="btn btn-ghost text-xl font-bold hover:bg-transparent">
              <CheckSquare className="w-6 h-6 text-primary" />
              <span className="hidden sm:inline">TaskTracker</span>
            </Link>
          </div>
          
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-2">
              <li><a href="#features" className="btn btn-ghost rounded-lg">Features</a></li>
              <li><a href="#testimonials" className="btn btn-ghost rounded-lg">Reviews</a></li>
              <li><a href="#pricing" className="btn btn-ghost rounded-lg">Pricing</a></li>
            </ul>
          </div>
          
          <div className="navbar-end gap-2">
            <Link to="/login" className="btn btn-ghost hidden sm:flex">Sign In</Link>
            <Link to="/signup" className="btn btn-primary btn-sm sm:btn-md">Get Started</Link>
            
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button 
                className="btn btn-ghost btn-square"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-base-100 border-b border-base-300 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <ul className="space-y-2">
                <li><a href="#features" className="block py-2 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Features</a></li>
                <li><a href="#testimonials" className="block py-2 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Reviews</a></li>
                <li><a href="#pricing" className="block py-2 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Pricing</a></li>
                <li><Link to="/login" className="block py-2 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Sign In</Link></li>
              </ul>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero min-h-[85vh] relative overflow-hidden">
        <div className="hero-content text-center relative z-10 px-4">
          <div className="max-w-5xl">
            <div className="mb-8">
              <div className="flex justify-center mb-8">
                <div className="badge badge-primary badge-lg gap-2 p-4 shadow-lg">
                  <Star className="w-4 h-4" />
                  Trusted by 10,000+ users worldwide
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight mb-6">
                Get Things Done
                <br />
                <span className="text-base-content">Beautifully Simple</span>
              </h1>
              <p className="text-lg sm:text-xl text-base-content/70 mt-6 max-w-3xl mx-auto leading-relaxed">
                The most intuitive task tracker that helps you stay organized, focused, and productive. 
                Transform chaos into clarity with our powerful yet simple platform designed for modern professionals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
              <Link to="/signup" className="btn btn-primary btn-lg gap-2 w-full sm:w-auto min-w-48 shadow-lg hover:shadow-xl transition-all">
                Start Free Today
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="#features" className="btn btn-outline btn-lg gap-2 w-full sm:w-auto min-w-48">
                See How It Works
              </Link>
            </div>

            <div className="text-sm text-base-content/60 space-y-2">
              <p>✓ No credit card required</p>
              <p>✓ Free forever plan available</p>
              <p>✓ Setup in under 2 minutes</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-base-content/60">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-base-content/60">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">1M+</div>
                <div className="text-sm text-base-content/60">Tasks Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">4.9/5</div>
                <div className="text-sm text-base-content/60">User Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-ping"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 bg-base-200/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Why Choose TaskTracker?</h2>
            <p className="text-lg sm:text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
              Designed with productivity in mind, our platform offers everything you need to stay organized and achieve your goals efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="card-body text-center p-6 sm:p-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="card-title justify-center text-lg sm:text-xl mb-3">{feature.title}</h3>
                  <p className="text-base-content/70 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Loved by Professionals</h2>
            <p className="text-lg sm:text-xl text-base-content/70 leading-relaxed">
              See what industry leaders say about their productivity transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="card-body p-6 sm:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="avatar">
                      <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to initials if image fails to load
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="bg-primary text-primary-content w-full h-full rounded-full items-center justify-center text-lg font-bold hidden">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-base-content/60 leading-relaxed">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-base-content/80 leading-relaxed text-base mb-4">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional social proof */}
          <div className="text-center mt-16">
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-sm font-medium">Trusted by teams at:</div>
              <div className="flex flex-wrap justify-center gap-6 text-lg font-bold text-base-content/40">
                <span>Google</span>
                <span>Microsoft</span>
                <span>Spotify</span>
                <span>Netflix</span>
                <span>Uber</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-content mb-6">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-lg sm:text-xl text-primary-content/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals who have already revolutionized their workflow with TaskTracker. 
            Start your journey to peak productivity today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup" className="btn btn-accent btn-lg gap-2 w-full sm:w-auto min-w-48 shadow-lg hover:shadow-xl">
              Start Your Journey Today
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg gap-2 w-full sm:w-auto min-w-48 text-primary-content border-primary-content hover:bg-primary-content hover:text-primary">
              Sign In Now
            </Link>
          </div>
          <div className="text-sm text-primary-content/80 mt-6">
            Join 10,000+ satisfied users • No setup fees • Cancel anytime
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-8 sm:p-10 bg-base-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="flex flex-col items-center">
            <CheckSquare className="w-12 h-12 text-primary mb-2" />
            <p className="font-bold text-lg">TaskTracker</p>
            <p className="text-base-content/60 text-sm">Making productivity beautiful</p>
          </div>
          
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-base-content mb-2">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a className="link link-hover">Features</a>
              <a className="link link-hover">Pricing</a>
              <a className="link link-hover">About</a>
              <a className="link link-hover">Contact</a>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-base-content mb-2">Legal</h3>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <a className="link link-hover">Privacy Policy</a>
              <a className="link link-hover">Terms of Service</a>
              <a className="link link-hover">Cookie Policy</a>
            </div>
          </div>
        </div>
        
        <div className="w-full border-t border-base-300 pt-6 mt-6">
          <p className="text-base-content/60 text-sm">
            © 2024 TaskTracker. All rights reserved. Made with ❤️ for productivity enthusiasts.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
