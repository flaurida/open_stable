import React from 'react';
import RestaurantIndexItem from './restaurant_index_item';

class RestaurantIndex extends React.Component {
  componentDidMount() {
    this.props.fetchAllRestaurants();
  }

  restaurantIndexItems() {
    return Object.values(this.props.restaurants).map((restaurant, i) => (
      <RestaurantIndexItem key={i} restaurant={ restaurant } />
    ));
  }

  render() {
    return (
      <div className="restaurant-index">
        <ul>
          { this.restaurantIndexItems() }
        </ul>
      </div>
    )
  }
}

export default RestaurantIndex;
