import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CourseOverview = ({ courses }) => {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: {
        label: 'Feedback Submitted',
        className: 'bg-green-100 text-green-800 border-green-200',
        icon: 'CheckCircle'
      },
      pending: {
        label: 'Feedback Pending',
        className: 'bg-amber-100 text-amber-800 border-amber-200',
        icon: 'Clock'
      },
      overdue: {
        label: 'Overdue',
        className: 'bg-red-100 text-red-800 border-red-200',
        icon: 'AlertTriangle'
      }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${config?.className}`}>
        <Icon name={config?.icon} size={12} />
        <span>{config?.label}</span>
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Course Overview</h2>
        <Button
          variant="outline"
          size="sm"
          iconName="BookOpen"
          iconPosition="left"
        >
          View All Courses
        </Button>
      </div>
      <div className="space-y-4">
        {courses?.map((course) => (
          <div
            key={course?.id}
            className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-smooth"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="BookOpen" size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{course?.name}</h3>
                  <p className="text-sm text-muted-foreground">{course?.code}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center space-x-1">
                  <Icon name="User" size={12} />
                  <span>{course?.instructor}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Users" size={12} />
                  <span>{course?.students} students</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} />
                  <span>{course?.semester}</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                {getStatusBadge(course?.feedbackStatus)}
                {course?.feedbackStatus === 'pending' && (
                  <Button
                    variant="default"
                    size="sm"
                    iconName="MessageSquarePlus"
                    iconPosition="left"
                    onClick={() => navigate('/submit-feedback')}
                  >
                    Submit Feedback
                  </Button>
                )}
                {course?.feedbackStatus === 'completed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                    onClick={() => navigate('/student-profile')}
                  >
                    View Feedback
                  </Button>
                )}
                {course?.feedbackStatus === 'overdue' && (
                  <Button
                    variant="destructive"
                    size="sm"
                    iconName="AlertTriangle"
                    iconPosition="left"
                    onClick={() => navigate('/submit-feedback')}
                  >
                    Submit Now
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseOverview;