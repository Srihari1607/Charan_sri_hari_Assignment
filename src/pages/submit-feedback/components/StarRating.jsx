import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const StarRating = ({ rating, onRatingChange, error }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const ratingLabels = {
    1: 'Poor',
    2: 'Fair', 
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent'
  };

  const handleStarClick = (starValue) => {
    onRatingChange(starValue);
  };

  const handleStarHover = (starValue) => {
    setHoverRating(starValue);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-foreground mb-3">
        Course Rating <span className="text-error">*</span>
      </label>
      <div className="flex items-center space-x-2 mb-2">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <button
            key={star}
            type="button"
            className="p-1 rounded-md hover:bg-muted transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            onMouseLeave={handleStarLeave}
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          >
            <Icon
              name="Star"
              size={32}
              className={`transition-smooth ${
                star <= displayRating
                  ? 'text-accent fill-accent' :'text-muted-foreground hover:text-accent'
              }`}
            />
          </button>
        ))}
      </div>
      {displayRating > 0 && (
        <p className="text-sm text-muted-foreground mb-2">
          {ratingLabels?.[displayRating]} ({displayRating}/5)
        </p>
      )}
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  );
};

export default StarRating;