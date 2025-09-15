import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const trustBadges = [
    {
      icon: 'Shield',
      title: 'SSL Secured',
      description: 'Your data is encrypted and secure'
    },
    {
      icon: 'GraduationCap',
      title: 'Educational Institution',
      description: 'Trusted by universities worldwide'
    },
    {
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'FERPA compliant data handling'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {trustBadges?.map((badge, index) => (
          <div key={index} className="flex items-center space-x-3 text-center sm:text-left">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={badge?.icon} size={20} className="text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{badge?.title}</p>
              <p className="text-xs text-muted-foreground">{badge?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustIndicators;