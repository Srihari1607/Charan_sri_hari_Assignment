import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ userName, currentTime }) => {
  const getGreeting = () => {
    const hour = new Date(currentTime)?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const formatDate = () => {
    return new Date(currentTime)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 mb-8 text-primary-foreground">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {getGreeting()}, {userName}!
          </h1>
          <p className="text-primary-foreground/80 mb-4">
            Welcome back to your feedback dashboard
          </p>
          <div className="flex items-center space-x-4 text-sm text-primary-foreground/70">
            <span className="flex items-center space-x-1">
              <Icon name="Calendar" size={16} />
              <span>{formatDate()}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Clock" size={16} />
              <span>{new Date(currentTime)?.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}</span>
            </span>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="w-20 h-20 bg-primary-foreground/10 rounded-full flex items-center justify-center">
            <Icon name="GraduationCap" size={40} className="text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;