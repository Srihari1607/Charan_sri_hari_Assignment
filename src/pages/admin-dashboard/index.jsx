import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MetricCard from './components/MetricCard';
import QuickActionCard from './components/QuickActionCard';
import RecentFeedbackTable from './components/RecentFeedbackTable';
import FeedbackChart from './components/FeedbackChart';
import ActivityFeed from './components/ActivityFeed';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    metrics: {
      totalFeedback: 1247,
      totalStudents: 342,
      averageRating: 4.2,
      activeUsers: 89
    },
    trends: {
      feedbackChange: '+12%',
      studentsChange: '+8%',
      ratingChange: '+0.3',
      usersChange: '+15%'
    }
  });

  // Mock data for recent feedback
  const recentFeedback = [
    {
      id: 1,
      studentName: "Sarah Johnson",
      course: "Computer Science 101",
      rating: 5,
      status: "reviewed",
      date: "Sep 14, 2025"
    },
    {
      id: 2,
      studentName: "Michael Chen",
      course: "Data Structures",
      rating: 4,
      status: "pending",
      date: "Sep 14, 2025"
    },
    {
      id: 3,
      studentName: "Emily Rodriguez",
      course: "Web Development",
      rating: 3,
      status: "flagged",
      date: "Sep 13, 2025"
    },
    {
      id: 4,
      studentName: "David Thompson",
      course: "Database Systems",
      rating: 5,
      status: "reviewed",
      date: "Sep 13, 2025"
    },
    {
      id: 5,
      studentName: "Lisa Wang",
      course: "Software Engineering",
      rating: 4,
      status: "pending",
      date: "Sep 12, 2025"
    }
  ];

  // Mock data for charts
  const courseRatingsData = [
    { name: 'CS 101', rating: 4.5 },
    { name: 'Data Structures', rating: 4.2 },
    { name: 'Web Dev', rating: 4.7 },
    { name: 'Database', rating: 4.1 },
    { name: 'Software Eng', rating: 4.3 },
    { name: 'Algorithms', rating: 4.6 }
  ];

  const ratingDistributionData = [
    { name: '5 Stars', value: 45 },
    { name: '4 Stars', value: 32 },
    { name: '3 Stars', value: 15 },
    { name: '2 Stars', value: 6 },
    { name: '1 Star', value: 2 }
  ];

  // Mock activity data
  const recentActivities = [
    {
      id: 1,
      type: 'feedback',
      message: 'New feedback submitted for Computer Science 101',
      timestamp: new Date(Date.now() - 300000) // 5 minutes ago
    },
    {
      id: 2,
      type: 'student',
      message: 'New student registered: Alex Martinez',
      timestamp: new Date(Date.now() - 900000) // 15 minutes ago
    },
    {
      id: 3,
      type: 'course',
      message: 'Course "Advanced React" was updated',
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    },
    {
      id: 4,
      type: 'feedback',
      message: 'Feedback flagged for review in Database Systems',
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: 5,
      type: 'system',
      message: 'Weekly backup completed successfully',
      timestamp: new Date(Date.now() - 7200000) // 2 hours ago
    }
  ];

  const quickActions = [
    {
      title: 'Manage Feedback',
      description: 'Review, filter, and export feedback submissions',
      icon: 'MessageSquare',
      path: '/manage-feedback',
      color: 'blue'
    },
    {
      title: 'Manage Students',
      description: 'View, edit, and manage student accounts',
      icon: 'Users',
      path: '/manage-students',
      color: 'green'
    },
    {
      title: 'Manage Courses',
      description: 'Add, edit, and organize course offerings',
      icon: 'BookOpen',
      path: '/manage-courses',
      color: 'amber'
    },
    {
      title: 'Analytics Report',
      description: 'Generate detailed analytics and insights',
      icon: 'BarChart3',
      path: '/analytics',
      color: 'purple'
    }
  ];

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      console.log('Dashboard data loaded');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="admin" userName="Admin User" userEmail="admin@edufeedback.com" />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumb />
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your feedback system today.
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <Button variant="outline" iconName="Download" iconPosition="left">
              Export Data
            </Button>
            <Button variant="default" iconName="Plus" iconPosition="left">
              Quick Action
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Feedback"
            value={dashboardData?.metrics?.totalFeedback?.toLocaleString()}
            change={dashboardData?.trends?.feedbackChange}
            changeType="positive"
            icon="MessageSquare"
            color="blue"
          />
          <MetricCard
            title="Registered Students"
            value={dashboardData?.metrics?.totalStudents?.toLocaleString()}
            change={dashboardData?.trends?.studentsChange}
            changeType="positive"
            icon="Users"
            color="green"
          />
          <MetricCard
            title="Average Rating"
            value={dashboardData?.metrics?.averageRating?.toFixed(1)}
            change={dashboardData?.trends?.ratingChange}
            changeType="positive"
            icon="Star"
            color="amber"
          />
          <MetricCard
            title="Active Users"
            value={dashboardData?.metrics?.activeUsers?.toString()}
            change={dashboardData?.trends?.usersChange}
            changeType="positive"
            icon="Activity"
            color="purple"
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions?.map((action, index) => (
              <QuickActionCard
                key={index}
                title={action?.title}
                description={action?.description}
                icon={action?.icon}
                path={action?.path}
                color={action?.color}
              />
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Feedback Table - Takes 2 columns */}
          <div className="lg:col-span-2">
            <RecentFeedbackTable feedbackData={recentFeedback} />
          </div>

          {/* Activity Feed - Takes 1 column */}
          <div className="lg:col-span-1">
            <ActivityFeed activities={recentActivities} />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FeedbackChart chartData={courseRatingsData} chartType="bar" />
          <FeedbackChart chartData={ratingDistributionData} chartType="pie" />
        </div>

        {/* Additional Stats Section */}
        <div className="mt-8 bg-card border border-border rounded-lg p-6 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">System Overview</h3>
            <Link to="/analytics" className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth">
              View Detailed Analytics
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="TrendingUp" size={24} className="text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">94%</p>
              <p className="text-sm text-muted-foreground">Response Rate</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Clock" size={24} className="text-green-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">2.3</p>
              <p className="text-sm text-muted-foreground">Avg Response Time (days)</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Target" size={24} className="text-amber-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">87%</p>
              <p className="text-sm text-muted-foreground">Satisfaction Score</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;