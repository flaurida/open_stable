import React from 'react';
import { Link } from 'react-router';
import { RestaurantDollarSigns, currentUserIsOwner } from './restaurant_helper';

class RestaurantIndexItem extends React.Component {
  editAndDeleteLinks() {
    if (this.props.currentUser && currentUserIsOwner(this.props.currentUser, this.props.restaurant)) {

      return (
        <div className="edit-and-delete-links">
          <Link to={ `/restaurants/${this.props.restaurant.id}/edit`} className="restaurant-edit-link">
            Edit
          </Link>
          <button onClick={ () => this.props.deleteRestaurant(this.props.restaurant) }>
            Delete
          </button>
          <Link to={ `/restaurants/${this.props.restaurant.id}/tables` } className="restaurant-edit-link">
            View Stalls
          </Link>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const { restaurant } = this.props;

    return (
      <div className="restaurant-index-item">
        <div className="restaurant-notes">
          <Link to={ `/restaurants/${restaurant.id}` }>
            <img src={ restaurant.image_url } className="img-link" alt="restaurant"/>
          </Link>

          <div className="restaurant-notes-detail">
            <Link to={ `/restaurants/${restaurant.id}` }>
              { restaurant.name }
            </Link>
            <div className="restaurant-details">
              <RestaurantDollarSigns numDollarSigns={ restaurant.num_dollar_signs } />
              <p>Categories placeholder</p>
              <p>{ restaurant.city }</p>
              <p>{ this.editAndDeleteLinks() }</p>
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
