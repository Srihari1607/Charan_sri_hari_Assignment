import React from 'react';
import Select from '../../../components/ui/Select';

const CourseSelector = ({ selectedCourse, onCourseChange, courses, error }) => {
  const courseOptions = courses?.map(course => ({
    value: course?.id,
    label: `${course?.code} - ${course?.name}`,
    description: `${course?.instructor} • ${course?.credits} credits`
  }));

  return (
    <div className="mb-6">
      <Select
        label="Select Course"
        description="Choose the course you want to provide feedback for"
        placeholder="Select a course..."
        options={courseOptions}
        value={selectedCourse}
        onChange={onCourseChange}
        error={error}
        required
        searchable
        className="w-full"
      />
    </div>
  );
};

export default CourseSelector;