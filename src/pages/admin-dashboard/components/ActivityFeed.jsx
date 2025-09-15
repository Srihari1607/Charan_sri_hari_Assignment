import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const iconMap = {
      'feedback': 'MessageSquare',
      'student': 'User',
      'course': 'BookOpen',
      'system': 'Settings'
    };
    return iconMap?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      'feedback': 'text-blue-600 bg-blue-50',
      'student': 'text-green-600 bg-green-50',
      'course': 'text-amber-600 bg-amber-50',
      'system': 'text-purple-600 bg-purple-50'
    };
    return colorMap?.[type] || 'text-gray-600 bg-gray-50';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity?.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{formatTimeAgo(activity?.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 text-sm text-primary hover:text-primary/80 font-medium transition-smooth">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;