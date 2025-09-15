import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import CourseSelector from './components/CourseSelector';
import StarRating from './components/StarRating';
import FeedbackTextArea from './components/FeedbackTextArea';
import SubmissionStatus from './components/SubmissionStatus';
import AutoSaveIndicator from './components/AutoSaveIndicator';

const SubmitFeedback = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Mock courses data
  const courses = [
    {
      id: 'CS101',
      code: 'CS101',
      name: 'Introduction to Computer Science',
      instructor: 'Dr. Sarah Johnson',
      credits: 3
    },
    {
      id: 'MATH201',
      code: 'MATH201', 
      name: 'Calculus II',
      instructor: 'Prof. Michael Chen',
      credits: 4
    },
    {
      id: 'ENG102',
      code: 'ENG102',
      name: 'English Composition',
      instructor: 'Dr. Emily Rodriguez',
      credits: 3
    },
    {
      id: 'PHYS151',
      code: 'PHYS151',
      name: 'General Physics I',
      instructor: 'Dr. Robert Kim',
      credits: 4
    },
    {
      id: 'HIST105',
      code: 'HIST105',
      name: 'World History',
      instructor: 'Prof. Lisa Thompson',
      credits: 3
    }
  ];

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (selectedCourse || rating > 0 || feedback?.trim()) {
        setIsSaving(true);
        // Simulate auto-save
        setTimeout(() => {
          setLastSaved(Date.now());
          setIsSaving(false);
        }, 1000);
      }
    }, 2000);

    return () => clearTimeout(autoSaveTimer);
  }, [selectedCourse, rating, feedback]);

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('feedbackDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setSelectedCourse(draft?.selectedCourse || '');
        setRating(draft?.rating || 0);
        setFeedback(draft?.feedback || '');
        setLastSaved(draft?.lastSaved || null);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  // Save draft to localStorage
  useEffect(() => {
    const draft = {
      selectedCourse,
      rating,
      feedback,
      lastSaved
    };
    localStorage.setItem('feedbackDraft', JSON.stringify(draft));
  }, [selectedCourse, rating, feedback, lastSaved]);

  const validateForm = () => {
    const newErrors = {};

    if (!selectedCourse) {
      newErrors.course = 'Please select a course';
    }

    if (rating === 0) {
      newErrors.rating = 'Please provide a rating';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful submission
      const selectedCourseData = courses?.find(course => course?.id === selectedCourse);
      
      // Clear form and draft
      setSelectedCourse('');
      setRating(0);
      setFeedback('');
      setLastSaved(null);
      localStorage.removeItem('feedbackDraft');
      
      setSubmissionStatus('success');
      setSubmissionMessage(`Feedback for ${selectedCourseData?.name} submitted successfully!`);
      
    } catch (error) {
      setSubmissionStatus('error');
      setSubmissionMessage('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setSubmissionStatus(null);
    setSubmissionMessage('');
  };

  const handleViewHistory = () => {
    navigate('/student-dashboard');
  };

  const handleSubmitAnother = () => {
    setSubmissionStatus(null);
    setSubmissionMessage('');
  };

  const characterCount = feedback?.length;

  if (submissionStatus) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole="student" userName="John Doe" userEmail="john.doe@university.edu" />
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Breadcrumb />
          <SubmissionStatus
            status={submissionStatus}
            message={submissionMessage}
            onRetry={handleRetry}
            onViewHistory={handleViewHistory}
            onSubmitAnother={handleSubmitAnother}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="student" userName="John Doe" userEmail="john.doe@university.edu" />
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Breadcrumb />
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="MessageSquarePlus" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Submit Course Feedback</h1>
              <p className="text-muted-foreground">Share your experience and help improve course quality</p>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="bg-card border border-border rounded-lg shadow-soft">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Course Selection */}
              <CourseSelector
                selectedCourse={selectedCourse}
                onCourseChange={setSelectedCourse}
                courses={courses}
                error={errors?.course}
              />

              {/* Star Rating */}
              <StarRating
                rating={rating}
                onRatingChange={setRating}
                error={errors?.rating}
              />

              {/* Feedback Text Area */}
              <FeedbackTextArea
                feedback={feedback}
                onFeedbackChange={setFeedback}
                characterCount={characterCount}
                maxCharacters={500}
              />

              {/* Auto-save Indicator */}
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <AutoSaveIndicator lastSaved={lastSaved} isSaving={isSaving} />
                
                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/student-dashboard')}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    loading={isSubmitting}
                    iconName="Send"
                    iconPosition="left"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-muted/50 border border-border rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Feedback Guidelines</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Be honest and constructive in your feedback</li>
                <li>• Focus on specific aspects like content, teaching methods, and assignments</li>
                <li>• Your feedback is anonymous and helps improve course quality</li>
                <li>• You can edit or delete your feedback within 24 hours of submission</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitFeedback;