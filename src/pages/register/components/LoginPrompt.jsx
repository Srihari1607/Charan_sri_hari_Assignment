import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginPrompt = () => {
  return (
    <div className="text-center space-y-4 p-6 bg-card border border-border rounded-lg">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Already have an account?</h3>
        <p className="text-sm text-muted-foreground">
          Sign in to access your feedback dashboard and continue where you left off
        </p>
      </div>
      
      <Link to="/login">
        <Button
          variant="outline"
          size="lg"
          iconName="LogIn"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Sign In Instead
        </Button>
      </Link>
      
      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
        <Icon name="Info" size={12} />
        <span>Registration takes less than 2 minutes</span>
      </div>
    </div>
  );
};

export default LoginPrompt;