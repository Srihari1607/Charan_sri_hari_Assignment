import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const NotificationMessage = ({ type, message, onClose, autoClose = true }) => {
  useEffect(() => {
    if (autoClose && message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose, autoClose]);

  if (!message) return null;

  const getNotificationStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-success/10 border-success/20 text-success-foreground',
          icon: 'CheckCircle',
          iconColor: 'text-success'
        };
      case 'error':
        return {
          container: 'bg-error/10 border-error/20 text-error-foreground',
          icon: 'AlertCircle',
          iconColor: 'text-error'
        };
      case 'warning':
        return {
          container: 'bg-warning/10 border-warning/20 text-warning-foreground',
          icon: 'AlertTriangle',
          iconColor: 'text-warning'
        };
      default:
        return {
          container: 'bg-muted border-border text-foreground',
          icon: 'Info',
          iconColor: 'text-muted-foreground'
        };
    }
  };

  const styles = getNotificationStyles();

  return (
    <div className={`border rounded-lg p-4 mb-6 ${styles?.container} transition-all`}>
      <div className="flex items-start space-x-3">
        <Icon name={styles?.icon} size={20} className={styles?.iconColor} />
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
};

export default NotificationMessage;