import React from 'react';
import { Link } from 'react-router';

const cityLinksItems = () => {
  return window.CITIES.map((city, i) => (
    <li key={i}><Link to={{ pathname: "/restaurants", query: { city: city }}}>{ city }</Link></li>
  ));
};

export const SplashCityLinks = () => {
  return (
    <ul>
      { cityLinksItems() }
    </ul>
  );
};

const citySelectItems = () => {
  return window.CITIES.map((city, i) => (
    <option value={ city } key={ city }>
      { city }
    </option>
  ));
};

export const CitySelect = ({ handleChange, value }) => (
  <div className="city-select">
    <i className="fa fa-map-marker" aria-hidden="true"></i>
    <select value={ value } onChange={ handleChange } className="city-select">
      { citySelectItems() }
    </select>
  </div>
);
