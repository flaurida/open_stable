import React from 'react';

const seatOptions = max => {
  const seatOptions = [];

  for (let i = 1; i <= max; i++) {
    let pretty_value = i === 1 ? `${i} horse` : `${i} horses`;

    seatOptions.push(
      <option value={i} key={i}>{ pretty_value }</option>
    );
  }

  return seatOptions;
};

export const SeatSelect = ({ type, handleChange, value, errors }) => {
  const message = type === "min_seats" ? "Min horses" : "Max horses";

  return (
    <select value={ value } key={ type } onChange={ handleChange(type) }
      className={ errors[type] ? "input-error" : "" }>
      <option value="" disabled>{ message }</option>
      { seatOptions(20) }
    </select>
  );
};

const diningOptions = () => {
  return window.DINING_TIMES.map((time, i) => (
    <option value={ time } key={i}>{ time / 60 } hours</option>
  ));
}

export const DiningTimeSelect = ({ handleChange, value, errors }) => {
  return (
    <select value={ value } onChange={ handleChange("dining_time") }
      className={ errors.dining_time ? "input-error" : "" }>
      <option value="" disabled>Duration</option>
      { diningOptions() }
    </select>
  );
};
