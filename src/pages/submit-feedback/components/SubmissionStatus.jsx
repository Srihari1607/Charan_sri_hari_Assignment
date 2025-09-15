import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubmissionStatus = ({ status, message, onRetry, onViewHistory, onSubmitAnother }) => {
  if (status === 'success') {
    return (
      <div className="bg-success/10 border border-success/20 rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} color="white" />
        </div>
        <h3 className="text-lg font-semibold text-success mb-2">Feedback Submitted Successfully!</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Thank you for your valuable feedback. Your response has been recorded and will help improve the course quality.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={onViewHistory}
            iconName="History"
            iconPosition="left"
          >
            View My Feedback
          </Button>
          <Button
            variant="default"
            onClick={onSubmitAnother}
            iconName="Plus"
            iconPosition="left"
          >
            Submit Another
          </Button>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="bg-error/10 border border-error/20 rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-error rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="AlertCircle" size={32} color="white" />
        </div>
        <h3 className="text-lg font-semibold text-error mb-2">Submission Failed</h3>
        <p className="text-sm text-muted-foreground mb-6">
          {message || 'There was an error submitting your feedback. Please try again.'}
        </p>
        <Button
          variant="outline"
          onClick={onRetry}
          iconName="RefreshCw"
          iconPosition="left"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return null;
};

export default SubmissionStatus;