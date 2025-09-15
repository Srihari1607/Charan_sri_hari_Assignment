import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different user types
  const mockCredentials = {
    student: { email: 'student@edu.com', password: 'Student123!' },
    admin: { email: 'admin@edu.com', password: 'Admin123!' }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check credentials
      const isStudent = formData?.email === mockCredentials?.student?.email && 
                       formData?.password === mockCredentials?.student?.password;
      const isAdmin = formData?.email === mockCredentials?.admin?.email && 
                     formData?.password === mockCredentials?.admin?.password;

      if (isStudent) {
        localStorage.setItem('authToken', 'mock-student-token');
        localStorage.setItem('userRole', 'student');
        localStorage.setItem('userName', 'John Doe');
        localStorage.setItem('userEmail', formData?.email);
        navigate('/student-dashboard');
      } else if (isAdmin) {
        localStorage.setItem('authToken', 'mock-admin-token');
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userName', 'Admin User');
        localStorage.setItem('userEmail', formData?.email);
        navigate('/admin-dashboard');
      } else {
        setErrors({
          general: 'Invalid email or password. Please use the provided mock credentials.'
        });
      }
    } catch (error) {
      setErrors({
        general: 'Login failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors?.general && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <Icon name="AlertCircle" size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-red-800 text-sm font-medium">Authentication Failed</p>
            <p className="text-red-700 text-sm mt-1">{errors?.general}</p>
          </div>
        </div>
      )}
      <div className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          className="w-full"
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          className="w-full"
        />
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName={isLoading ? undefined : "LogIn"}
        iconPosition="left"
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;