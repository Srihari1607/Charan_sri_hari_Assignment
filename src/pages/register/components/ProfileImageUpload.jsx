import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfileImageUpload = ({ onImageUpload, profileImage }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = e?.dataTransfer?.files;
    if (files?.length > 0) {
      handleFileSelect(files?.[0]);
    }
  };

  const handleFileSelect = (file) => {
    setUploadError('');
    
    // Validate file type
    if (!file?.type?.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file?.size > 5 * 1024 * 1024) {
      setUploadError('Image size must be less than 5MB');
      return;
    }
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageUpload(e?.target?.result);
    };
    reader?.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveImage = () => {
    onImageUpload(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Profile Picture (Optional)</h3>
      {profileImage ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-border">
              <Image
                src={profileImage}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 rounded-full"
              onClick={handleRemoveImage}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef?.current?.click()}
            iconName="Upload"
            iconPosition="left"
          >
            Change Picture
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Icon name="Upload" size={24} className="text-muted-foreground" />
            </div>
            
            <div className="space-y-2">
              <p className="text-foreground font-medium">Upload Profile Picture</p>
              <p className="text-sm text-muted-foreground">
                Drag and drop your image here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports: JPG, PNG, GIF (Max 5MB)
              </p>
            </div>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef?.current?.click()}
              iconName="ImagePlus"
              iconPosition="left"
            >
              Choose File
            </Button>
          </div>
        </div>
      )}
      {uploadError && (
        <div className="flex items-center space-x-2 text-error text-sm">
          <Icon name="AlertCircle" size={16} />
          <span>{uploadError}</span>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImageUpload;