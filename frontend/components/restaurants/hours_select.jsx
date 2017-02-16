import React from 'react';

const hoursSelectItems = () => {
  return window.TIMES.map((time, i) => (
    <option value={ time } key={i}>
      { time }
    </option>
  ));
};

const HoursSelectForDay = ({ hours, day, handleHoursChange, errors }) => {
  const hoursArray = hours[day];
  let className = "";

  if (errors["hours"] && errors["hours"].length > 0) {
    if (errors["hours"][0][day]) {
      className = "input-error";
    }
  }

  return (
    <div className="hours-select-day">
      <HoursSelectPair hours={[hours[day][0], hours[day][1]]} handleHoursChange={handleHoursChange} className={className} day={day} />
    </div>
  );
};

const HoursSelectPair = ({ hours, handleHoursChange, className, day }) => (
  <div className="hours-select-pair">
    <select value={hours[0]} key={hours[0]} onChange={ handleHoursChange(day, 0) } className={ className }>
      { hoursSelectItems() }
    </select>
    <p>to</p>
    <select value={hours[1]} key={hours[1]} onChange={ handleHoursChange(day, 1) } className={ className }>
      { hoursSelectItems() }
    </select>
  </div>
);

export const AllHoursSelect = ({ hours, handleHoursChange, errors }) => {
  if (!hours) return null;

  const dailyHours = window.DAYS.map((day, i) => (
    <div className="hours-select-day" key={i}>
      <label>{ capitalize(day) }</label>
      <HoursSelectForDay day={ day } hours={ hours } handleHoursChange={ handleHoursChange } errors={ errors } />
    </div>
  ));

  return (
    <div className="hours-select">
      { dailyHours }
    </div>
  );
};

export const capitalize = word => {
  word = word.toLowerCase();
  return word[0].toUpperCase() + word.slice(1);
};
