import React from 'react';
import Input from '../../../components/ui/Input';

const PersonalInfoForm = ({ formData, errors, onChange }) => {
  const handleInputChange = (field) => (e) => {
    onChange(field, e?.target?.value);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={handleInputChange('fullName')}
          error={errors?.fullName}
          required
          className="col-span-1 md:col-span-2"
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange('email')}
          error={errors?.email}
          required
          disabled
          description="Email cannot be changed. Contact admin if needed."
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="(555) 123-4567"
          value={formData?.phone}
          onChange={handleInputChange('phone')}
          error={errors?.phone}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        />

        <Input
          label="Date of Birth"
          type="date"
          value={formData?.dateOfBirth}
          onChange={handleInputChange('dateOfBirth')}
          error={errors?.dateOfBirth}
          max={new Date()?.toISOString()?.split('T')?.[0]}
        />

        <Input
          label="Student ID"
          type="text"
          placeholder="Your student ID"
          value={formData?.studentId}
          onChange={handleInputChange('studentId')}
          error={errors?.studentId}
          disabled
          description="Student ID is assigned by the institution"
        />

        <div className="col-span-1 md:col-span-2">
          <Input
            label="Address"
            type="text"
            placeholder="Enter your complete address"
            value={formData?.address}
            onChange={handleInputChange('address')}
            error={errors?.address}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;