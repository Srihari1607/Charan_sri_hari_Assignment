import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const NavigationLinks = () => {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <Link
          to="/register"
          className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-smooth"
        >
          <Icon name="UserPlus" size={16} />
          <span>Create new account</span>
        </Link>
        
        <button
          type="button"
          className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
          onClick={() => {
            // Mock forgot password functionality
            alert('Password reset link would be sent to your email address.');
          }}
        >
          <Icon name="HelpCircle" size={16} />
          <span>Forgot password?</span>
        </button>
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          By signing in, you agree to our{' '}
          <button className="text-primary hover:underline">Terms of Service</button>
          {' '}and{' '}
          <button className="text-primary hover:underline">Privacy Policy</button>
        </p>
      </div>
    </div>
  );
};

export default NavigationLinks;