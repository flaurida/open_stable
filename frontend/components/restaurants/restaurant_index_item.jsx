import React from 'react';
import { Link } from 'react-router';
import { RestaurantDollarSigns } from './restaurant_helper';

class RestaurantIndexItem extends React.Component {
  render() {
    const { restaurant } = this.props;

    return (
      <div className="restaurant-index-item">
        <div className="restaurant-notes">
          <Link to={ `/restaurants/${restaurant.id}` }>
            <img src={ window.images.restaurantPhoto } className="img-link" alt="restaurant"/>
          </Link>

          <div className="restaurant-notes-detail">
            <Link to={ `/restaurants/${restaurant.id}` }>
              { restaurant.name }
            </Link>
            <div className="restaurant-details">
              <RestaurantDollarSigns numDollarSigns={ restaurant.num_dollar_signs } />
              <p>Categories placeholder</p>
              <p>{ restaurant.city }</p>
            </div>
          </div>
        </div>

        <div className="restaruant-reviews">
          <p>This is a placeholder review</p>
        </div>
      </div>
    );
  }
}

export default RestaurantIndexItem;
