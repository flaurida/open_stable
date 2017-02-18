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

  if (hours[day].length === 0) {
    return (
      <div className="hours-select-day">
        <div className="hours-select-label">
          <label>{ capitalize(day) }</label>
        </div>
        <button type="button" className="open-button" onClick={ handleHoursChange(day, null, false) }>Open</button>
      </div>
    );
  } else {
    const result = [];

    for (let i = 0; i < hours[day].length; i += 2) {

      result.push(
        <div key={i} className="hours-select-day">
          <div className="hours-select-label">
            <label>{ capitalize(day) }</label>
            <button type="button" onClick={ handleHoursChange(day, null, true) }>Close</button>
            <button type="button" onClick={ handleHoursChange(day, null, false) }>Add Timeslot</button>
          </div>
          <HoursSelectPair i={i} hours={[hours[day][i], hours[day][i + 1]]} handleHoursChange={handleHoursChange} className={className} day={day} />
        </div>
      );
    }

    return <div>{ result }</div>;
  }
};

const HoursSelectPair = ({ hours, handleHoursChange, className, day, i }) => {
  return (
    <div className="hours-select-pair">
      <select value={hours[0]} key={hours[i]} onChange={ handleHoursChange(day, i) } className={ className }>
        { hoursSelectItems() }
      </select>
      <p>to</p>
      <select value={hours[1]} key={hours[i + 1]} onChange={ handleHoursChange(day, i + 1) } className={ className }>
        { hoursSelectItems() }
      </select>
    </div>
  );
};

export const AllHoursSelect = ({ hours, handleHoursChange, errors }) => {
  if (!hours) return null;

  const dailyHours = window.DAYS.map((day, i) => (
    <div key={i}>
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
