import React from 'react';
import { CheckCircle, Sparkles, Trophy, Star } from 'lucide-react';

const SuccessAnimation = ({ type = 'task', message, onComplete }) => {
  const animations = {
    task: {
      icon: <CheckCircle className="w-16 h-16 text-success" />,
      title: "Task Completed! 🎉",
      subtitle: message || "Great job on staying productive!",
      color: "success"
    },
    signup: {
      icon: <Sparkles className="w-16 h-16 text-primary" />,
      title: "Welcome to TaskTracker! ✨",
      subtitle: message || "Your productivity journey starts now!",
      color: "primary"
    },
    achievement: {
      icon: <Trophy className="w-16 h-16 text-warning" />,
      title: "Achievement Unlocked! 🏆",
      subtitle: message || "You're becoming a productivity master!",
      color: "warning"
    }
  };

  const config = animations[type] || animations.task;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete && onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative">
        {/* Animated background circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-primary/20 animate-ping"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/30 animate-ping delay-75"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/40 animate-ping delay-150"></div>
        </div>

        {/* Main content */}
        <div className="relative bg-base-100 rounded-2xl p-8 shadow-2xl max-w-sm mx-auto text-center transform animate-bounce">
          {/* Floating sparkles */}
          <div className="absolute -top-4 -left-4 text-warning animate-pulse">
            <Star className="w-6 h-6" />
          </div>
          <div className="absolute -top-2 -right-6 text-primary animate-pulse delay-75">
            <Star className="w-4 h-4" />
          </div>
          <div className="absolute -bottom-4 -right-4 text-success animate-pulse delay-150">
            <Star className="w-5 h-5" />
          </div>

          {/* Main icon */}
          <div className="mb-4 transform animate-bounce">
            {config.icon}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {config.title}
          </h2>

          {/* Subtitle */}
          <p className="text-base-content/70 mb-4">
            {config.subtitle}
          </p>

          {/* Progress bar */}
          <div className="w-full bg-base-300 rounded-full h-1 mb-4">
            <div 
              className={`h-1 rounded-full bg-${config.color} animate-pulse progress-fill`}
            />
          </div>

          {/* Auto-close message */}
          <p className="text-xs text-base-content/50">
            Auto-closing in a moment...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessAnimation;
