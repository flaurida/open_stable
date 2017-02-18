import React from 'react';
import RestaurantIndexItem from './restaurant_index_item';
import { Link } from 'react-router';

class RestaurantIndex extends React.Component {
  componentDidMount() {
    this.props.requestAllRestaurants();
  }

  restaurantIndexItems() {
    return Object.values(this.props.restaurants).map((restaurant, i) => (
      <RestaurantIndexItem key={i} restaurant={ restaurant }
        deleteRestaurant={ this.props.deleteRestaurant } currentUser={ this.props.currentUser }/>
    ));
  }

  render() {
    return (
      <div className="index-container">
        <div className="splash-container">
          <h1>Find a reservation for your entire horde</h1>
          <img src={ window.images.splashPhoto } alt="Dothraki"/>
        </div>

        <div className="restaurant-index">
          <ul>
            { this.restaurantIndexItems() }
          </ul>
        </div>
      </div>
    );
  }
}

export default RestaurantIndex;
