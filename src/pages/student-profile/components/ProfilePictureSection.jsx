import React, { useState, useRef } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfilePictureSection = ({ currentImage, onImageChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(currentImage);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFileChange(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileChange = (file) => {
    if (file && file?.type?.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e?.target?.result);
        onImageChange(file);
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFileChange(e?.target?.files?.[0]);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    onImageChange(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Profile Picture</h3>
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        {/* Current Image Display */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-border">
            {previewImage ? (
              <Image
                src={previewImage}
                alt="Profile picture"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Icon name="User" size={32} className="text-muted-foreground" />
              </div>
            )}
          </div>
        </div>

        {/* Upload Area */}
        <div className="flex-1 w-full">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Icon name="Upload" size={24} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop your image here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Supports: JPG, PNG, GIF (Max 5MB)
            </p>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef?.current?.click()}
              >
                <Icon name="Upload" size={16} className="mr-2" />
                Choose File
              </Button>
              
              {previewImage && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveImage}
                >
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureSection;