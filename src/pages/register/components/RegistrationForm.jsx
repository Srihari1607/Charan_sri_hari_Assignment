import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';


const RegistrationForm = ({ onImageUpload, profileImage }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validatePassword = (password) => {
    return password?.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(password);
  };

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value?.trim()) error = 'Name is required';
        else if (value?.trim()?.length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value?.trim()) error = 'Email is required';
        else if (!validateEmail(value)) error = 'Please enter a valid email address';
        break;
      case 'phone':
        if (!value?.trim()) error = 'Phone number is required';
        else if (!/^\+?[\d\s\-\(\)]{10,}$/?.test(value)) error = 'Please enter a valid phone number';
        break;
      case 'dateOfBirth':
        if (!value) error = 'Date of birth is required';
        else {
          const birthDate = new Date(value);
          const today = new Date();
          const age = today?.getFullYear() - birthDate?.getFullYear();
          if (age < 16) error = 'You must be at least 16 years old';
        }
        break;
      case 'address':
        if (!value?.trim()) error = 'Address is required';
        else if (value?.trim()?.length < 10) error = 'Please provide a complete address';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (!validatePassword(value)) error = 'Password must be at least 8 characters with uppercase, lowercase, and number';
        break;
      case 'confirmPassword':
        if (!value) error = 'Please confirm your password';
        else if (value !== formData?.password) error = 'Passwords do not match';
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    let error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    
    // Special case for confirm password when password changes
    if (name === 'password' && formData?.confirmPassword) {
      const confirmError = validateField('confirmPassword', formData?.confirmPassword);
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData)?.forEach(key => {
      let error = validateField(key, formData?.[key]);
      if (error) newErrors[key] = error;
    });
    
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors)?.length === 0) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        // Mock successful registration
        localStorage.setItem('authToken', 'mock-jwt-token');
        localStorage.setItem('userRole', 'student');
        navigate('/student-dashboard');
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
        
        <Input
          label="Full Name"
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData?.name}
          onChange={handleInputChange}
          error={errors?.name}
          required
        />
        
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          description="We'll use this for login and important notifications"
          required
        />
        
        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={formData?.phone}
          onChange={handleInputChange}
          error={errors?.phone}
          required
        />
        
        <Input
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={formData?.dateOfBirth}
          onChange={handleInputChange}
          error={errors?.dateOfBirth}
          required
        />
        
        <Input
          label="Address"
          type="text"
          name="address"
          placeholder="Enter your complete address"
          value={formData?.address}
          onChange={handleInputChange}
          error={errors?.address}
          required
        />
      </div>
      {/* Security Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Account Security</h3>
        
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Create a strong password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          description="Must be at least 8 characters with uppercase, lowercase, and number"
          required
        />
        
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          required
        />
      </div>
      {/* Terms and Conditions */}
      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e?.target?.checked)}
          error={errors?.terms}
          required
        />
        
        <div className="text-sm text-muted-foreground">
          <p>By creating an account, you agree to our data handling practices and educational use policies.</p>
        </div>
      </div>
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={!agreedToTerms}
        iconName="UserPlus"
        iconPosition="left"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegistrationForm;