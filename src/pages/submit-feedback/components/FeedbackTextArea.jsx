import React from 'react';

const FeedbackTextArea = ({ feedback, onFeedbackChange, characterCount, maxCharacters = 500 }) => {
  const isNearLimit = characterCount > maxCharacters * 0.8;
  const isOverLimit = characterCount > maxCharacters;

  return (
    <div className="mb-6">
      <label htmlFor="feedback-text" className="block text-sm font-medium text-foreground mb-2">
        Detailed Feedback
      </label>
      <p className="text-sm text-muted-foreground mb-3">
        Share your thoughts about the course content, teaching methods, assignments, and overall experience.
      </p>
      <textarea
        id="feedback-text"
        rows={6}
        className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical transition-smooth"
        placeholder="Write your detailed feedback here... (optional)"
        value={feedback}
        onChange={(e) => onFeedbackChange(e?.target?.value)}
        maxLength={maxCharacters}
      />
      <div className="flex justify-between items-center mt-2">
        <p className="text-xs text-muted-foreground">
          Your feedback helps improve the course quality
        </p>
        <p className={`text-xs font-medium ${
          isOverLimit ? 'text-error' : isNearLimit ? 'text-warning' : 'text-muted-foreground'
        }`}>
          {characterCount}/{maxCharacters}
        </p>
      </div>
    </div>
  );
};

export default FeedbackTextArea;