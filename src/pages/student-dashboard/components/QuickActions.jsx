import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Submit New Feedback',
      description: 'Provide feedback for your courses',
      icon: 'Plus',
      variant: 'default',
      onClick: () => navigate('/submit-feedback'),
      primary: true
    },
    {
      title: 'View Feedback History',
      description: 'Review your past submissions',
      icon: 'History',
      variant: 'outline',
      onClick: () => navigate('/student-profile')
    },
    {
      title: 'Update Profile',
      description: 'Manage your account settings',
      icon: 'User',
      variant: 'outline',
      onClick: () => navigate('/student-profile')
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions?.map((action, index) => (
          <div
            key={index}
            className={`bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth cursor-pointer ${
              action?.primary ? 'ring-2 ring-primary ring-opacity-20' : ''
            }`}
            onClick={action?.onClick}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-lg ${action?.primary ? 'bg-primary' : 'bg-muted'} flex items-center justify-center`}>
                <Icon 
                  name={action?.icon} 
                  size={20} 
                  className={action?.primary ? 'text-primary-foreground' : 'text-muted-foreground'} 
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-1">{action?.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{action?.description}</p>
                <Button
                  variant={action?.variant}
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={(e) => {
                    e?.stopPropagation();
                    action?.onClick();
                  }}
                >
                  {action?.primary ? 'Get Started' : 'View'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;