import React from 'react';
import Icon from '../../../components/AppIcon';

const AutoSaveIndicator = ({ lastSaved, isSaving }) => {
  if (isSaving) {
    return (
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Icon name="Loader2" size={16} className="animate-spin" />
        <span>Saving draft...</span>
      </div>
    );
  }

  if (lastSaved) {
    const timeAgo = Math.floor((Date.now() - lastSaved) / 1000);
    let timeText = '';
    
    if (timeAgo < 60) {
      timeText = 'just now';
    } else if (timeAgo < 3600) {
      timeText = `${Math.floor(timeAgo / 60)} min ago`;
    } else {
      timeText = `${Math.floor(timeAgo / 3600)} hr ago`;
    }

    return (
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Icon name="Check" size={16} className="text-success" />
        <span>Draft saved {timeText}</span>
      </div>
    );
  }

  return null;
};

export default AutoSaveIndicator;