import React from 'react';

const fullStar = key => <p key={ key }><i className="fa fa-star full-star" aria-hidden="true"></i></p>;
const emptyStar = key => <p key={ key }><i className="fa fa-star empty-star" aria-hidden="true"></i></p>;

export const ReviewStars = ({ numStars }) => {
  const fullStars = [];
  const emptyStars = [];

  for (let i = 0; i < numStars; i++) {
    fullStars.push(fullStar(i));
  }

  for (let i = 0; i < 5 - numStars; i++) {
    emptyStars.push(emptyStar(i));
  }

  return (
    <div className="review-stars">
      { fullStars }
      { emptyStars }
    </div>
  );
};
