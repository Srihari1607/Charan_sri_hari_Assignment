import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';
import ProfileImageUpload from './components/ProfileImageUpload';
import TrustSignals from './components/TrustSignals';
import LoginPrompt from './components/LoginPrompt';

const Register = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (imageUrl) => {
    setProfileImage(imageUrl);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="MessageSquare" size={24} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-foreground">EduFeedback</span>
              <span className="text-sm text-muted-foreground font-medium">Pro</span>
            </div>
          </Link>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Page Header */}
            <div className="text-center lg:text-left space-y-4">
              <h1 className="text-3xl font-bold text-foreground">Create Your Account</h1>
              <p className="text-lg text-muted-foreground">
                Join thousands of students sharing valuable course feedback to improve education quality
              </p>
            </div>

            {/* Registration Form Card */}
            <div className="bg-card border border-border rounded-lg p-8 shadow-soft">
              <div className="space-y-8">
                {/* Profile Image Upload */}
                <ProfileImageUpload
                  onImageUpload={handleImageUpload}
                  profileImage={profileImage}
                />

                {/* Registration Form */}
                <RegistrationForm
                  onImageUpload={handleImageUpload}
                  profileImage={profileImage}
                />
              </div>
            </div>

            {/* Legal Links */}
            <div className="text-center space-y-4">
              <div className="flex flex-wrap justify-center items-center space-x-6 text-sm text-muted-foreground">
                <Link to="/terms" className="hover:text-foreground transition-smooth">
                  Terms of Service
                </Link>
                <Link to="/privacy" className="hover:text-foreground transition-smooth">
                  Privacy Policy
                </Link>
                <Link to="/support" className="hover:text-foreground transition-smooth">
                  Support
                </Link>
              </div>
              
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                By registering, you acknowledge that you have read and agree to our Terms of Service 
                and Privacy Policy. Your educational data will be handled in compliance with FERPA regulations.
              </p>
            </div>
          </div>

          {/* Right Column - Trust Signals & Login Prompt */}
          <div className="space-y-6">
            {/* Trust Signals */}
            <TrustSignals />

            {/* Login Prompt */}
            <LoginPrompt />

            {/* Benefits Section */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Why Join EduFeedback Pro?</h3>
              
              <div className="space-y-3">
                {[
                  {
                    icon: 'MessageSquarePlus',
                    title: 'Easy Feedback Submission',
                    description: 'Submit course feedback in under 2 minutes'
                  },
                  {
                    icon: 'BarChart3',
                    title: 'Track Your Impact',
                    description: 'See how your feedback improves courses'
                  },
                  {
                    icon: 'Shield',
                    title: 'Anonymous & Secure',
                    description: 'Your identity is protected at all times'
                  },
                  {
                    icon: 'Smartphone',
                    title: 'Mobile Friendly',
                    description: 'Access from any device, anywhere'
                  }
                ]?.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={benefit?.icon} size={16} className="text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">{benefit?.title}</p>
                      <p className="text-xs text-muted-foreground">{benefit?.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-lg p-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Join Our Community</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">50K+</div>
                    <div className="text-xs text-muted-foreground">Active Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">1.2M+</div>
                    <div className="text-xs text-muted-foreground">Feedback Submitted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-xs text-muted-foreground">Universities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">98%</div>
                    <div className="text-xs text-muted-foreground">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="MessageSquare" size={20} color="white" />
              </div>
              <span className="text-lg font-semibold text-foreground">EduFeedback Pro</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Empowering students to shape better educational experiences through meaningful feedback.
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
              <span>© {new Date()?.getFullYear()} EduFeedback Pro</span>
              <span>•</span>
              <span>Made with ❤️ for Education</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;