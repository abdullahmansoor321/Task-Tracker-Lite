import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Star, Users, Clock, TrendingUp, Shield, Zap, ArrowRight } from 'lucide-react';

const LandingPage = () => {
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
      role: "Product Manager",
      content: "This task tracker transformed how I manage my daily workflow. Simple yet powerful!",
      avatar: "SJ"
    },
    {
      name: "Mike Chen",
      role: "Freelancer",
      content: "Finally, a task manager that doesn't get in my way. Love the clean interface!",
      avatar: "MC"
    },
    {
      name: "Emma Davis",
      role: "Team Lead",
      content: "Our team productivity increased by 40% after switching to this platform.",
      avatar: "ED"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5">
      {/* Navigation */}
      <nav className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-300/50 sticky top-0 z-50">
        <div className="container mx-auto">
          <div className="navbar-start">
            <Link to="/" className="btn btn-ghost text-xl font-bold">
              <CheckSquare className="w-6 h-6 text-primary" />
              TaskTracker
            </Link>
          </div>
          
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><a href="#features">Features</a></li>
              <li><a href="#testimonials">Reviews</a></li>
            </ul>
          </div>
          
          <div className="navbar-end gap-2">
            <Link to="/login" className="btn btn-ghost">Sign In</Link>
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero min-h-[80vh] relative overflow-hidden">
        <div className="hero-content text-center relative z-10">
          <div className="max-w-4xl">
            <div className="mb-8">
              <div className="flex justify-center mb-6">
                <div className="badge badge-primary badge-lg gap-2 p-4">
                  <Star className="w-4 h-4" />
                  Trusted by 10,000+ users
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
                Get Things Done
                <br />
                <span className="text-base-content">Beautifully Simple</span>
              </h1>
              <p className="text-xl text-base-content/70 mt-6 max-w-2xl mx-auto">
                The most intuitive task tracker that helps you stay organized, focused, and productive. 
                Transform chaos into clarity with our powerful yet simple platform.
              </p>
            </div>

            <div className="flex justify-center items-center mb-8">
              <Link to="/signup" className="btn btn-primary btn-lg gap-2 min-w-48">
                Start Free Today
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="text-sm text-base-content/60">
              No credit card required • Free forever plan available
            </div>
          </div>
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-base-200/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose TaskTracker?</h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Designed with productivity in mind, our platform offers everything you need to stay organized and achieve your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="card-body text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="card-title justify-center text-lg">{feature.title}</h3>
                  <p className="text-base-content/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Professionals</h2>
            <p className="text-xl text-base-content/70">
              See what our users say about their productivity transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="avatar placeholder">
                      <div className="bg-primary text-primary-content rounded-full w-12">
                        <span className="text-sm font-bold">{testimonial.avatar}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-base-content/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-base-content/80">"{testimonial.content}"</p>
                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-content mb-4">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-xl text-primary-content/80 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already revolutionized their workflow with TaskTracker.
          </p>
          <Link to="/signup" className="btn btn-accent btn-lg gap-2">
            Start Your Journey Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200">
        <div>
          <CheckSquare className="w-12 h-12 text-primary" />
          <p className="font-bold text-lg">TaskTracker</p>
          <p className="text-base-content/60">Making productivity beautiful since 2024</p>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <a className="link link-hover">About</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Privacy</a>
            <a className="link link-hover">Terms</a>
          </div>
        </div>
        <div>
          <p className="text-base-content/60">© 2024 TaskTracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
