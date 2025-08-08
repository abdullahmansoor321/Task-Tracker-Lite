import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection = ({ theme, testimonials }) => {
  return (
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
  );
};

export default TestimonialsSection;
