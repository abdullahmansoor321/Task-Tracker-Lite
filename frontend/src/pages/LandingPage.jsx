import React, { useState } from 'react';
import { Zap, Shield, TrendingUp, Users } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import LandingNavbar from '../components/landing/LandingNavbar';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import CTASection from '../components/landing/CTASection';
import LandingFooter from '../components/landing/LandingFooter';

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
      <LandingNavbar 
        theme={theme}
        toggleTheme={toggleTheme}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      
      <HeroSection theme={theme} stats={stats} />
      
      <FeaturesSection theme={theme} features={features} />
      
      <TestimonialsSection theme={theme} testimonials={testimonials} />
      
      <CTASection />
      
      <LandingFooter theme={theme} />
    </div>
  );
};

export default LandingPage;
