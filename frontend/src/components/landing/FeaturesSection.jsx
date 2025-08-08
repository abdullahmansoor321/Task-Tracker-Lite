import React from 'react';

const FeaturesSection = ({ theme, features }) => {
  return (
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
  );
};

export default FeaturesSection;
