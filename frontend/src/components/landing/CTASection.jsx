import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
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
  );
};

export default CTASection;
