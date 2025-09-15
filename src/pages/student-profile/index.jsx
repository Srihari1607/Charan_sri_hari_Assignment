import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProfilePictureSection from './components/ProfilePictureSection';
import PersonalInfoForm from './components/PersonalInfoForm';
import PasswordChangeForm from './components/PasswordChangeForm';
import NotificationMessage from './components/NotificationMessage';

const StudentProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });
  const [activeTab, setActiveTab] = useState('profile');

  // Mock user data
  const [profileData, setProfileData] = useState({
    fullName: "John Michael Smith",
    email: "john.smith@university.edu",
    phone: "555-123-4567",
    dateOfBirth: "1999-03-15",
    studentId: "STU2021001",
    address: "123 University Ave, College Town, ST 12345",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || userRole !== 'student') {
      navigate('/login');
      return;
    }
  }, [navigate]);

  const validatePersonalInfo = () => {
    const newErrors = {};

    if (!profileData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!profileData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(profileData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (profileData?.phone && !/^\d{3}-\d{3}-\d{4}$/?.test(profileData?.phone)) {
      newErrors.phone = 'Phone number must be in format: 555-123-4567';
    }

    if (profileData?.dateOfBirth) {
      const birthDate = new Date(profileData.dateOfBirth);
      const today = new Date();
      const age = today?.getFullYear() - birthDate?.getFullYear();
      if (age < 16 || age > 100) {
        newErrors.dateOfBirth = 'Please enter a valid date of birth';
      }
    }

    return newErrors;
  };

  const validatePassword = () => {
    const newErrors = {};

    if (!passwordData?.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData?.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else {
      if (passwordData?.newPassword?.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters long';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/?.test(passwordData?.newPassword)) {
        newErrors.newPassword = 'Password must contain uppercase, lowercase, number, and special character';
      }
    }

    if (!passwordData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleProfileDataChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePasswordDataChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleImageChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profileImage: e?.target?.result
        }));
      };
      reader?.readAsDataURL(file);
    } else {
      setProfileData(prev => ({
        ...prev,
        profileImage: null
      }));
    }
  };

  const handleSaveProfile = async () => {
    const validationErrors = validatePersonalInfo();
    
    if (Object.keys(validationErrors)?.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation - check if current password is correct
      if (passwordData?.currentPassword && passwordData?.currentPassword !== 'student123') {
        setErrors({ currentPassword: 'Current password is incorrect' });
        setNotification({
          type: 'error',
          message: 'Failed to update profile. Please check your current password.'
        });
        return;
      }

      setNotification({
        type: 'success',
        message: 'Profile updated successfully!'
      });

      // Clear password fields after successful update
      if (passwordData?.currentPassword) {
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }

    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to update profile. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    const validationErrors = validatePassword();
    
    if (Object.keys(validationErrors)?.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation - check if current password is correct
      if (passwordData?.currentPassword !== 'student123') {
        setErrors({ currentPassword: 'Current password is incorrect' });
        setNotification({
          type: 'error',
          message: 'Current password is incorrect. Please try again.'
        });
        return;
      }

      setNotification({
        type: 'success',
        message: 'Password changed successfully!'
      });

      // Clear password fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to change password. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const clearNotification = () => {
    setNotification({ type: '', message: '' });
  };

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: 'User' },
    { id: 'password', label: 'Change Password', icon: 'Lock' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="student" userName="John Smith" userEmail="john.smith@university.edu" />
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Breadcrumb />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and account settings
          </p>
        </div>

        <NotificationMessage
          type={notification?.type}
          message={notification?.message}
          onClose={clearNotification}
        />

        {/* Tab Navigation */}
        <div className="border-b border-border mb-8">
          <nav className="flex space-x-8">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'profile' && (
            <>
              <ProfilePictureSection
                currentImage={profileData?.profileImage}
                onImageChange={handleImageChange}
              />

              <PersonalInfoForm
                formData={profileData}
                errors={errors}
                onChange={handleProfileDataChange}
              />

              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button
                  variant="outline"
                  onClick={() => navigate('/student-dashboard')}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveProfile}
                  loading={loading}
                  iconName="Save"
                  iconPosition="left"
                >
                  Save Changes
                </Button>
              </div>
            </>
          )}

          {activeTab === 'password' && (
            <>
              <PasswordChangeForm
                formData={passwordData}
                errors={errors}
                onChange={handlePasswordDataChange}
              />

              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setPasswordData({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                    setErrors({});
                  }}
                  disabled={loading}
                >
                  Clear
                </Button>
                <Button
                  onClick={handleChangePassword}
                  loading={loading}
                  iconName="Lock"
                  iconPosition="left"
                >
                  Change Password
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentProfile;