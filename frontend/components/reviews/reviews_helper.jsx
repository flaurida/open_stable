import React from 'react';

const fullStar = key => <p key={ key }><i className="fa fa-star full-star" aria-hidden="true"></i></p>;
const emptyStar = key => <p key={ key }><i className="fa fa-star empty-star" aria-hidden="true"></i></p>;

export const ReviewStars = ({ numStars = 0 }) => {
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

const starOption = (value, type, field, handleChange) => {
  return (
    <div key={ `${value}-stars-${field}` }>
      <label htmlFor={ `${value}-stars-${field}` }><i className={ `fa fa-star ${type}-star` } aria-hidden="true"></i></label>
      <input type="radio" id={ `${value}-stars-${field}` } key={ `${value}-stars-${field}` }
        value={ value } className="hidden" onChange={ handleChange(field) }/>
    </div>
  );
};

export const ReviewStarsInput = ({ numStars = 0, field, handleChange, resetField }) => {
  const reviewStarsInput = [];
  numStars = parseInt(numStars);

  for (let i = 1; i <= 5; i++) {
    const type = i <= numStars ? "full" : "empty";
    reviewStarsInput.push(starOption(i, type, field, handleChange));
  }

  return (
    <div className="review-stars-input">
        { reviewStarsInput }
    </div>
  );
};
