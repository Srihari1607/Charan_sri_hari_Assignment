import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PasswordChangeForm = ({ formData, errors, onChange }) => {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleInputChange = (field) => (e) => {
    onChange(field, e?.target?.value);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev?.[field]
    }));
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[A-Z]/?.test(password)) strength++;
    if (/[a-z]/?.test(password)) strength++;
    if (/[0-9]/?.test(password)) strength++;
    if (/[^A-Za-z0-9]/?.test(password)) strength++;

    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-error', 'bg-warning', 'bg-warning', 'bg-success', 'bg-success'];
    
    return {
      strength,
      label: labels?.[strength - 1] || '',
      color: colors?.[strength - 1] || ''
    };
  };

  const passwordStrength = getPasswordStrength(formData?.newPassword);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Change Password</h3>
      <div className="space-y-6">
        <div className="relative">
          <Input
            label="Current Password"
            type={showPasswords?.current ? "text" : "password"}
            placeholder="Enter your current password"
            value={formData?.currentPassword}
            onChange={handleInputChange('currentPassword')}
            error={errors?.currentPassword}
            required
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('current')}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showPasswords?.current ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>

        <div className="relative">
          <Input
            label="New Password"
            type={showPasswords?.new ? "text" : "password"}
            placeholder="Enter your new password"
            value={formData?.newPassword}
            onChange={handleInputChange('newPassword')}
            error={errors?.newPassword}
            required
            description="Password must be at least 8 characters with uppercase, lowercase, number, and special character"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('new')}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showPasswords?.new ? "EyeOff" : "Eye"} size={16} />
          </button>
          
          {formData?.newPassword && (
            <div className="mt-2">
              <div className="flex items-center space-x-2 mb-1">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${passwordStrength?.color}`}
                    style={{ width: `${(passwordStrength?.strength / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {passwordStrength?.label}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <Input
            label="Confirm New Password"
            type={showPasswords?.confirm ? "text" : "password"}
            placeholder="Confirm your new password"
            value={formData?.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            error={errors?.confirmPassword}
            required
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('confirm')}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showPasswords?.confirm ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeForm;