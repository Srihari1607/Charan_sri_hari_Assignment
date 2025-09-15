import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MockCredentialsCard = () => {
  const [isVisible, setIsVisible] = useState(false);

  const credentials = [
    {
      role: 'Student',
      email: 'student@edu.com',
      password: 'Student123!',
      icon: 'User',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      role: 'Administrator',
      email: 'admin@edu.com',
      password: 'Admin123!',
      icon: 'UserCog',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={18} className="text-amber-600" />
          <h3 className="text-sm font-medium text-amber-800">Demo Credentials</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(!isVisible)}
          iconName={isVisible ? "EyeOff" : "Eye"}
          iconPosition="left"
        >
          {isVisible ? 'Hide' : 'Show'}
        </Button>
      </div>
      {isVisible && (
        <div className="space-y-3">
          {credentials?.map((cred, index) => (
            <div key={index} className={`p-3 ${cred?.bgColor} rounded-md border border-opacity-20`}>
              <div className="flex items-center space-x-2 mb-2">
                <Icon name={cred?.icon} size={16} className={cred?.color} />
                <span className={`text-sm font-medium ${cred?.color}`}>{cred?.role}</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Email:</span>
                  <div className="flex items-center space-x-1">
                    <code className="text-xs bg-white px-2 py-1 rounded border">{cred?.email}</code>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => copyToClipboard(cred?.email)}
                      iconName="Copy"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Password:</span>
                  <div className="flex items-center space-x-1">
                    <code className="text-xs bg-white px-2 py-1 rounded border">{cred?.password}</code>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => copyToClipboard(cred?.password)}
                      iconName="Copy"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MockCredentialsCard;