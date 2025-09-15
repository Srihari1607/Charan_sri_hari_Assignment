import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentFeedback = ({ feedbackList }) => {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent Feedback</h2>
        <Button
          variant="outline"
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => navigate('/student-profile')}
        >
          View All
        </Button>
      </div>
      {feedbackList?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MessageSquare" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No feedback yet</h3>
          <p className="text-muted-foreground mb-4">Start by submitting your first course feedback</p>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={() => navigate('/submit-feedback')}
          >
            Submit Feedback
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {feedbackList?.map((feedback) => (
            <div
              key={feedback?.id}
              className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-smooth"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-medium text-foreground">{feedback?.courseName}</h3>
                  <div className="flex items-center space-x-1">
                    {renderStars(feedback?.rating)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {feedback?.message}
                </p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>{formatDate(feedback?.submittedAt)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="User" size={12} />
                    <span>{feedback?.instructor}</span>
                  </span>
                </div>
              </div>
              <div className="ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/student-profile')}
                >
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentFeedback;