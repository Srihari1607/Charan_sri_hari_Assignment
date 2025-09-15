import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import WelcomeHeader from './components/WelcomeHeader';
import DashboardStats from './components/DashboardStats';
import QuickActions from './components/QuickActions';
import RecentFeedback from './components/RecentFeedback';
import CourseOverview from './components/CourseOverview';

const StudentDashboard = () => {
  const [currentTime] = useState(new Date('2025-09-15T01:55:46.900Z'));
  const [userName] = useState('John Doe');

  // Mock dashboard statistics
  const dashboardStats = {
    totalFeedback: 12,
    recentSubmissions: 3,
    pendingFeedback: 2,
    coursesEnrolled: 6
  };

  // Mock recent feedback data
  const recentFeedbackList = [
    {
      id: 1,
      courseName: 'Advanced Web Development',
      courseCode: 'CS-401',
      rating: 5,
      message: `The course content was excellent and the instructor provided clear explanations of complex concepts.\nThe hands-on projects really helped solidify my understanding of React and Node.js.\nI would definitely recommend this course to other students.`,
      instructor: 'Dr. Sarah Johnson',
      submittedAt: new Date('2025-09-10T14:30:00.000Z')
    },
    {
      id: 2,
      courseName: 'Database Management Systems',
      courseCode: 'CS-302',
      rating: 4,
      message: `Good course overall with comprehensive coverage of database concepts.\nThe SQL assignments were challenging but helpful.\nWould appreciate more real-world examples in future sessions.`,
      instructor: 'Prof. Michael Chen',
      submittedAt: new Date('2025-09-08T10:15:00.000Z')
    },
    {
      id: 3,
      courseName: 'Software Engineering Principles',
      courseCode: 'CS-350',
      rating: 5,
      message: `Outstanding course that covered all aspects of software development lifecycle.\nThe group project was particularly valuable for learning collaboration skills.\nExcellent teaching methodology and course structure.`,
      instructor: 'Dr. Emily Rodriguez',
      submittedAt: new Date('2025-09-05T16:45:00.000Z')
    }
  ];

  // Mock enrolled courses data
  const enrolledCourses = [
    {
      id: 1,
      name: 'Advanced Web Development',
      code: 'CS-401',
      instructor: 'Dr. Sarah Johnson',
      students: 45,
      semester: 'Fall 2025',
      feedbackStatus: 'completed'
    },
    {
      id: 2,
      name: 'Machine Learning Fundamentals',
      code: 'CS-450',
      instructor: 'Prof. David Kim',
      students: 38,
      semester: 'Fall 2025',
      feedbackStatus: 'pending'
    },
    {
      id: 3,
      name: 'Mobile App Development',
      code: 'CS-420',
      instructor: 'Dr. Lisa Wang',
      students: 32,
      semester: 'Fall 2025',
      feedbackStatus: 'pending'
    },
    {
      id: 4,
      name: 'Data Structures & Algorithms',
      code: 'CS-250',
      instructor: 'Prof. Robert Brown',
      students: 52,
      semester: 'Fall 2025',
      feedbackStatus: 'overdue'
    },
    {
      id: 5,
      name: 'Database Management Systems',
      code: 'CS-302',
      instructor: 'Prof. Michael Chen',
      students: 41,
      semester: 'Fall 2025',
      feedbackStatus: 'completed'
    },
    {
      id: 6,
      name: 'Software Engineering Principles',
      code: 'CS-350',
      instructor: 'Dr. Emily Rodriguez',
      students: 36,
      semester: 'Fall 2025',
      feedbackStatus: 'completed'
    }
  ];

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || userRole !== 'student') {
      window.location.href = '/login';
      return;
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="student" 
        userName={userName}
        userEmail="john.doe@university.edu"
      />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumb />
        
        <WelcomeHeader 
          userName={userName}
          currentTime={currentTime}
        />
        
        <DashboardStats stats={dashboardStats} />
        
        <QuickActions />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentFeedback feedbackList={recentFeedbackList} />
          <CourseOverview courses={enrolledCourses} />
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;