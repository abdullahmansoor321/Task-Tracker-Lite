import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';

const HeroSection = ({ theme, stats }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden mt-4">
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
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8">
            <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent leading-tight">
              Get Things Done
            </span>
            <br />
            <span className={`transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>Beautifully Simple</span>
          </h1>
          
          {/* Subtitle */}
          <p className={`text-base sm:text-lg lg:text-xl xl:text-2xl mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0 transition-colors duration-300 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            The most intuitive task tracker that helps you stay organized, focused, and productive. 
            Transform chaos into clarity with our powerful yet simple platform designed for modern professionals.
          </p>

          {/* Trust Badge - Moved down */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-sm rounded-full border shadow-lg transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-800/80 border-gray-600' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current" />
              <span className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>Trusted by 50,000+ users worldwide</span>
            </div>
          </div>
          
          {/* CTA Buttons - Removed Demo */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4 sm:px-0">
            <Link to="/signup" className="btn bg-gradient-to-r from-purple-600 to-purple-800 text-white border-0 btn-sm sm:btn-md lg:btn-lg px-6 sm:px-8 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 w-full sm:w-auto text-sm sm:text-base">
              <span>Start Free Today</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Link>
            <Link to="/login" className={`btn btn-outline btn-sm sm:btn-md lg:btn-lg px-6 sm:px-8 transition-all duration-300 w-full sm:w-auto text-sm sm:text-base ${
              theme === 'dark' 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              Sign In
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-3xl mx-auto mb-12 sm:mb-16 px-4 sm:px-0">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}>{stat.number}</div>
                <div className={`text-xs sm:text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Features Preview */}
          <div className="text-center space-y-2 sm:space-y-3 px-4 sm:px-0">
            <p className={`text-xs sm:text-sm transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>✓ No credit card required</p>
            <p className={`text-xs sm:text-sm transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>✓ Free forever plan available</p>
            <p className={`text-sm transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>✓ Setup in under 2 minutes</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
