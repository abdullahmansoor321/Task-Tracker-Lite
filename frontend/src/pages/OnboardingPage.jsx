import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, ArrowRight, ArrowLeft, Rocket, Target, Zap, Users, Star, Calendar, Clock, Trophy } from 'lucide-react';

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to TaskTracker! 🎉',
      subtitle: 'Your journey to peak productivity starts here',
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl">
            <Rocket className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">You're all set up!</h3>
            <p className="text-lg text-base-content/70 max-w-md mx-auto">
              Let's take a quick tour and show you how to make the most of TaskTracker
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-success/20 flex items-center justify-center mb-2">
                <Target className="w-6 h-6 text-success" />
              </div>
              <p className="text-sm font-medium">Set Goals</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-warning/20 flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-warning" />
              </div>
              <p className="text-sm font-medium">Stay Focused</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-info/20 flex items-center justify-center mb-2">
                <Trophy className="w-6 h-6 text-info" />
              </div>
              <p className="text-sm font-medium">Achieve More</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'create-tasks',
      title: 'Create Your First Task',
      subtitle: 'Tasks are the building blocks of productivity',
      content: (
        <div className="space-y-6">
          <div className="mockup-window border bg-base-300">
            <div className="flex justify-center px-4 py-16 bg-base-200">
              <div className="w-full max-w-md space-y-4">
                <div className="form-control">
                  <input 
                    type="text" 
                    placeholder="Complete project proposal..." 
                    className="input input-bordered w-full" 
                    disabled
                  />
                </div>
                <div className="form-control">
                  <textarea 
                    placeholder="Add description, notes, or details..." 
                    className="textarea textarea-bordered" 
                    disabled
                  />
                </div>
                <div className="flex gap-2">
                  <select className="select select-bordered flex-1" disabled>
                    <option>Due Date</option>
                  </select>
                  <button className="btn btn-primary">
                    <CheckSquare className="w-4 h-4" />
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Pro Tips:
            </h4>
            <ul className="space-y-2 text-sm text-base-content/70">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                Use clear, actionable titles like "Call client about contract"
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                Set realistic due dates to stay on track
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                Break large projects into smaller, manageable tasks
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'organize',
      title: 'Stay Organized',
      subtitle: 'Powerful tools to keep you on track',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card bg-base-200 border border-base-300">
              <div className="card-body p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-6 h-6 text-primary" />
                  <h4 className="font-semibold">Smart Scheduling</h4>
                </div>
                <p className="text-sm text-base-content/70">
                  Set due dates and get reminders. Never miss an important deadline again.
                </p>
              </div>
            </div>
            
            <div className="card bg-base-200 border border-base-300">
              <div className="card-body p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-warning" />
                  <h4 className="font-semibold">Progress Tracking</h4>
                </div>
                <p className="text-sm text-base-content/70">
                  Watch your productivity soar with detailed analytics and insights.
                </p>
              </div>
            </div>
            
            <div className="card bg-base-200 border border-base-300">
              <div className="card-body p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-6 h-6 text-success" />
                  <h4 className="font-semibold">Smart Filters</h4>
                </div>
                <p className="text-sm text-base-content/70">
                  Find tasks quickly with powerful search and filtering options.
                </p>
              </div>
            </div>
            
            <div className="card bg-base-200 border border-base-300">
              <div className="card-body p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-6 h-6 text-info" />
                  <h4 className="font-semibold">Sync Everywhere</h4>
                </div>
                <p className="text-sm text-base-content/70">
                  Access your tasks from any device, anywhere, anytime.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-primary" />
              <div>
                <h4 className="font-semibold">Ready to get started?</h4>
                <p className="text-sm text-base-content/70">You have all the tools you need to succeed!</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            TaskTracker
          </h1>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            {steps.map((_, index) => (
              <React.Fragment key={index}>
                <div className={`w-3 h-3 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-primary' : 'bg-base-300'
                }`} />
                {index < steps.length - 1 && (
                  <div className={`w-8 h-px transition-colors ${
                    index < currentStep ? 'bg-primary' : 'bg-base-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-8 lg:p-12">
            
            {/* Step Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                {steps[currentStep].title}
              </h2>
              <p className="text-lg text-base-content/70">
                {steps[currentStep].subtitle}
              </p>
            </div>

            {/* Step Content */}
            <div className="mb-8">
              {steps[currentStep].content}
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="flex gap-2">
                {currentStep > 0 && (
                  <button 
                    onClick={handlePrev}
                    className="btn btn-outline gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                )}
                
                <button 
                  onClick={handleSkip}
                  className="btn btn-ghost"
                >
                  Skip Tour
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-base-content/60">
                  {currentStep + 1} of {steps.length}
                </span>
                
                <button 
                  onClick={handleNext}
                  className="btn btn-primary gap-2 min-w-32"
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      Get Started
                      <Rocket className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-base-content/60">
          <p>🎉 Welcome to your productivity journey!</p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
