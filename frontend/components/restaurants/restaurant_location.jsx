import React from 'react';
import RestaurantMapContainer from './restaurant_map_container';

class RestaurantLocation extends React.Component {
  render () {
    if (!this.props.restaurant.latitude) return null;

    return (
      <section className="restaurant-location">
        <RestaurantMapContainer />
        <div className="restaurant-address">
          <p>{ this.props.restaurant.address }</p>
          <p>{ this.props.restaurant.city }, { this.props.restaurant.state }, { this.props.restaurant.zip_code }</p>
          <button onClick={() => this.props.receiveModal("map") }>
            View Larger Map
          </button>
        </div>
      </section>
    );
  }
}

export default RestaurantLocation;
