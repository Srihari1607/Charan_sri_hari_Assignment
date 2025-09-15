import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Feedback',
      value: stats?.totalFeedback,
      icon: 'MessageSquare',
      color: 'bg-blue-50 text-blue-600',
      iconBg: 'bg-blue-100'
    },
    {
      title: 'Recent Submissions',
      value: stats?.recentSubmissions,
      icon: 'Clock',
      color: 'bg-green-50 text-green-600',
      iconBg: 'bg-green-100'
    },
    {
      title: 'Pending Feedback',
      value: stats?.pendingFeedback,
      icon: 'AlertCircle',
      color: 'bg-amber-50 text-amber-600',
      iconBg: 'bg-amber-100'
    },
    {
      title: 'Courses Enrolled',
      value: stats?.coursesEnrolled,
      icon: 'BookOpen',
      color: 'bg-purple-50 text-purple-600',
      iconBg: 'bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-elevated transition-smooth">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{stat?.title}</p>
              <p className="text-3xl font-bold text-foreground">{stat?.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${stat?.iconBg} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;