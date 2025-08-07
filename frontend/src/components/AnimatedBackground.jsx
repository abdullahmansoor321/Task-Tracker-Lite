import React from 'react'

const AnimatedBackground = ({ title, subtitle }) => {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-8 min-h-screen pt-20">
      <div className="max-w-sm text-center">
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl shadow-lg transition-all duration-700 transform cursor-pointer ${
                i % 2 === 0 
                  ? "bg-blue-500/30 animate-pulse hover:scale-110 hover:bg-blue-500/50" 
                  : i % 3 === 0 
                  ? "bg-gray-500/30 animate-bounce hover:scale-105 hover:bg-gray-500/50" 
                  : "bg-teal-500/30 animate-pulse hover:rotate-12 hover:bg-teal-500/50"
              }`}
              style={{
                animationDelay: `${i * 0.25}s`,
                animationDuration: i % 2 === 0 ? '2.5s' : i % 3 === 0 ? '2s' : '3s',
              }}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{title || "Join our community"}</h2>
        <p className="text-gray-600">{subtitle || "Connect with friends, share moments, and stay in touch with your loved ones."}</p>
      </div>
    </div>
  );
};

export default AnimatedBackground;