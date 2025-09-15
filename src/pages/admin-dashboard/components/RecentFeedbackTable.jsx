import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentFeedbackTable = ({ feedbackData }) => {
  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < rating ? 'text-amber-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'pending': 'bg-amber-100 text-amber-800 border-amber-200',
      'reviewed': 'bg-green-100 text-green-800 border-green-200',
      'flagged': 'bg-red-100 text-red-800 border-red-200'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusClasses?.[status]}`}>
        {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Recent Feedback</h3>
          <button className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth">
            View All
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Student</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Course</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Rating</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Date</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {feedbackData?.map((feedback) => (
              <tr key={feedback?.id} className="hover:bg-muted/30 transition-smooth">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-white">
                        {feedback?.studentName?.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{feedback?.studentName}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-foreground">{feedback?.course}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-1">
                    {getRatingStars(feedback?.rating)}
                    <span className="text-sm text-muted-foreground ml-2">{feedback?.rating}/5</span>
                  </div>
                </td>
                <td className="py-4 px-6">{getStatusBadge(feedback?.status)}</td>
                <td className="py-4 px-6 text-sm text-muted-foreground">{feedback?.date}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-muted rounded transition-smooth">
                      <Icon name="Eye" size={16} className="text-muted-foreground" />
                    </button>
                    <button className="p-1 hover:bg-muted rounded transition-smooth">
                      <Icon name="Edit" size={16} className="text-muted-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentFeedbackTable;