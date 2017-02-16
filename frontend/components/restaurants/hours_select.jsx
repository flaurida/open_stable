import React from 'react';

const hoursSelectItems = () => {
  return window.TIMES.map((time, i) => (
    <option value={ time } key={i}>
      { time }
    </option>
  ));
}

const HoursSelectForDay = ({ hours, day, handleHoursChange}) => {
  const hoursArray = hours[day];

  const hoursSelect = hoursArray.map((hour, i) => (
    <select value={hour} key={i} onChange={ handleHoursChange(day, i) }>
      { hoursSelectItems() }
    </select>
  ));

  return (
    <div className="hours-select-day">
      { hoursSelect }
    </div>
  );
}

export const AllHoursSelect = ({ hours, handleHoursChange }) => {
  if (!hours) return null;

  const dailyHours = window.DAYS.map((day, i) => (
    <div className="hours-select-day" key={i}>
      <label>{ capitalize(day) }</label>
      <HoursSelectForDay day={ day } hours={ hours } handleHoursChange={ handleHoursChange } />
    </div>
  ));

  return (
    <div className="hours-select">
      { dailyHours }
    </div>
  );
}

const capitalize = word => {
  word = word.toLowerCase();
  return word[0].toUpperCase() + word.slice(1);
}
