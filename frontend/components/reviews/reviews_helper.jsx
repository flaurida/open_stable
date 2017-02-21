import React from 'react';

const starIcon = (key, type) => <p key={ key }><i className={ `fa fa-star ${type}-star` } aria-hidden="true"></i></p>;

export const ReviewStars = ({ numStars = 0 }) => {
  const starIcons = [];

  for (let i = 0; i < 5; i++) {
    if (i < numStars) {
      starIcons.push(starIcon(i, "full"));
    } else {
      starIcons.push(starIcon(i, "empty"));
    }
  }

  return (
    <div className="review-stars">
      { starIcons }
    </div>
  );
};

const starOption = (value, type, field, handleChange) => {
  return (
    <div key={ `${value}-stars-${field}` }>
      <label htmlFor={ `${value}-stars-${field}` }>
        <i className={ `fa fa-star ${type}-star` } aria-hidden="true"></i>
      </label>
      <input type="radio" id={ `${value}-stars-${field}` } key={ `${value}-stars-${field}` }
        value={ value } className="hidden" onChange={ handleChange(field) }/>
    </div>
  );
};

export const ReviewStarsInput = ({ numStars = 0, field, handleChange }) => {
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

const noiseLabels = ["quiet", "modest", "moderate", "loud", "screaming"];

const noiseOption = (value, type, handleChange) => {
  return (
    <div key={ `${value}-noise` }>
      <label htmlFor={ `${value}-noise` } className={ `noise-${type}` }>{ noiseLabels[value - 1] }</label>
      <input type="radio" id={ `${value}-noise` } key={ `${value}-noise` }
        value={ value } className="hidden" onChange={ handleChange("noise_rating") }/>
    </div>
  );
};


export const NoiseLevelInput = ({ noiseLevel = 0, handleChange }) => {
  const reviewNoiseInput = [];
  noiseLevel = parseInt(noiseLevel);

  for (let i = 1; i <= 5; i++) {
    const type = i === parseInt(noiseLevel) ? "selected" : "unselected";
    reviewNoiseInput.push(noiseOption(i, type, handleChange));
  }

  return (
    <div className="review-noise-input">
        { reviewNoiseInput }
    </div>
  );
};
