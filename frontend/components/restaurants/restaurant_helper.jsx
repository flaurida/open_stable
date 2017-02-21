import React from 'react';
import { seatOptions } from '../tables/table_form_helper';

const dollarSign = key => <p className="dollar-sign" key={ key }>$</p>;
const noDollarSign = key => <p className="no-dollar-sign" key={ key }>$</p>;

export const RestaurantDollarSigns = ({ numDollarSigns }) => {
  const dollarSigns = [];
  const noDollarSigns = [];

  for (let i = 0; i < numDollarSigns; i++) {
    dollarSigns.push(dollarSign(i));
  }

  for (let i = 0; i < 4 - numDollarSigns; i++) {
    noDollarSigns.push(noDollarSign(i));
  }

  return (
    <div className="dollar-signs">
      { dollarSigns }
      { noDollarSigns }
    </div>
  );
};

export const currentUserIsOwner = (currentUser, restaurant) => {
  return currentUser && currentUser.id === restaurant.owner_id;
};

export const NumGuestsSelect = ({ handleChange, value }) => {
  return (
    <select onChange={ handleChange } value={ value }>
      { seatOptions(20) }
    </select>
  );
};

const diningOptions = () => {
  return window.DINING_TIMES.map((time, i) => (
    <option value={ time } key={i}>{ time / 60 } hours</option>
  ));
};

export const DiningTimeSelect = ({ handleChange, value, errors }) => {
  return (
    <select value={ value } onChange={ handleChange("dining_time") }
      className={ errors.dining_time ? "input-error" : "" }>
      <option value="" disabled>Select Dining Time</option>
      { diningOptions() }
    </select>
  );
};

const categoryOptions = () => {
  return window.CATEGORIES.map((category, i) => (
    <option value={ category } key={i}>{ category }</option>
  ));
};

export const CategorySelect = ({ handleChange, value, errors }) => {
  return (
    <select value={ value } onChange={ handleChange("category") }
      className={ errors.category ? "input-error" : "" }>
      <option value="" disabled>Select Category</option>
      { categoryOptions() }
    </select>
  );
};

const strategyOptions = () => {
  return window.STRATEGIES.map((strategy, i) => (
    <option value={ strategy } key={i}>{ strategy }</option>
  ));
};

export const StrategySelect = ({ handleChange, value, errors }) => {
  return (
    <select value={ value } onChange={ handleChange("strategy") }
      className={ errors.strategy ? "input-error" : "" }>
      <option value="" disabled>Select Booking Strategy</option>
      { strategyOptions() }
    </select>
  );
};
