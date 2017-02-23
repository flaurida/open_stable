import React from 'react';
import { Link } from 'react-router';

const cityLinksItems = () => {
  return window.CITIES.map((city, i) => {
    const cityClass = city.toLowerCase().split(" ").join("-");

    return (
      <li className="splash-links" key={i}><Link to={{ pathname: "/restaurants", query: { city: city }}}>
        <img src={ `https://s3.amazonaws.com/openstable-pro/seed/${cityClass}.jpg` } alt={ city } />
        <p className="splash-city-name">{ city }</p>
      </Link></li>
    )
  });
};

export const SplashCityLinks = () => {
  return (
    <ul className="splash-links-container">
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

export const CitySelect = ({ handleChange, value }) => {
  return (
    <div className="city-select">
      <i className="fa fa-map-marker" aria-hidden="true"></i>
      <select value={ value } onChange={ handleChange } className="city-select">
        <option value="" disabled>Select City</option>
        { citySelectItems() }
      </select>
    </div>
  );
};
