import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import TrustIndicators from './components/TrustIndicators';
import MockCredentialsCard from './components/MockCredentialsCard';
import NavigationLinks from './components/NavigationLinks';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (authToken && userRole) {
      if (userRole === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-soft">
              <Icon name="MessageSquare" size={32} color="white" />
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to access your EduFeedback Pro account
          </p>
        </div>

        {/* Main Login Card */}
        <div className="bg-card border border-border rounded-xl shadow-soft p-6">
          <LoginForm />
          <NavigationLinks />
        </div>

        {/* Mock Credentials Card */}
        <MockCredentialsCard />

        {/* Trust Indicators */}
        <TrustIndicators />

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date()?.getFullYear()} EduFeedback Pro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;