import React from 'react';
import { Link } from 'react-router';
import { SplashCityLinks } from './splash_helper';
import RestaurantSearchContainer from '../restaurants/restaurant_search_container';
import SplashVideo from './splash_video';

class SplashPage extends React.Component {
  render() {
    return (
      <div className="splash-page-container">
        <div className="splash-search-container">
          <RestaurantSearchContainer title="Find a reservation for your entire horde" />
        </div>
        <SplashVideo />

        <SplashCityLinks />
      </div>
    );
  }
}

export default SplashPage;
