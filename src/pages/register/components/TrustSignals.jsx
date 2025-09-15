import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Data Privacy Compliant',
      description: 'FERPA and GDPR compliant data handling'
    },
    {
      icon: 'Lock',
      title: 'Secure Encryption',
      description: 'End-to-end encryption for all data'
    },
    {
      icon: 'Award',
      title: 'Educational Standards',
      description: 'Meets institutional security requirements'
    },
    {
      icon: 'Users',
      title: 'Trusted by Students',
      description: 'Used by 50,000+ students nationwide'
    }
  ];

  return (
    <div className="bg-muted/50 rounded-lg p-6 space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Your Data is Safe</h3>
        <p className="text-sm text-muted-foreground">
          We prioritize your privacy and security with industry-leading standards
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={16} className="text-success" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">{feature?.title}</p>
              <p className="text-xs text-muted-foreground">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={12} />
            <span>SOC 2 Certified</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={12} />
            <span>256-bit Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;