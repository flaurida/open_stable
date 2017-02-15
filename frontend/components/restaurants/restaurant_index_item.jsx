import React from 'react';
import { Link } from 'react-router';

class RestaurantIndexItem extends React.Component {
  render() {
    const { restaurant } = this.props;

    return (
      <div className="restaurant-index-item">
        <h1>{ restaurant.name }</h1>
        <div className="restaurant-notes">
          <p>{ restaurant.num_dollar_signs }</p>
        </div>

        <div className="restaurant-location">
          <p>{ restaurant.city }</p>
          <p>{ restaurant.state }</p>
        </div>
      </div>
    )
  }
}

export default RestaurantIndexItem;
