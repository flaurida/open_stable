import React from 'react';
import { ReviewStars } from './reviews_helper';

const ReviewsIndexItem = ({ review }) => {
  return (
    <div className="reviews-index-item">
        <div className="review-content">
          <div className="review-header">
            <ReviewStars numStars={ review.overall_rating } />
            <h3 className="review-name">{ review.reviewer_name }</h3>
          </div>
          <p>{ review.body }</p>
        </div>

        <div className="review-ratings">
          <ul>
            <li>Food&nbsp;&nbsp;&nbsp;<span>{ review.food_rating }</span></li>
            <li>Ambience&nbsp;&nbsp;&nbsp;<span>{ review.ambience_rating }</span></li>
            <li>Service&nbsp;&nbsp;&nbsp;<span>{ review.service_rating }</span></li>
            <li>Value&nbsp;&nbsp;&nbsp;<span>{ review.value_rating }</span></li>
          </ul>
      </div>
    </div>
  );
};

export default ReviewsIndexItem;
