import React from 'react';
import { Link, withRouter } from 'react-router';
import { currentUserIsOwner } from './restaurant_helper';

class RestaurantNav extends React.Component {
  editLink() {
    if (currentUserIsOwner(this.props.currentUser, this.props.restaurant)) {
      return (
        <li><Link to={ `/restaurants/${this.props.restaurant.id}/edit`}>
          Edit
        </Link></li>
      );
    } else {
      return null;
    }
  }

  locationLink() {
    if (this.props.restaurant.latitude) {
      return (
        <li><a href="/#location">Location</a></li>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <nav className="restaurant-nav">
        <ul>
          <li><a href="/#reservations">Reservation</a></li>
          { this.locationLink() }
          <li><a href="/#about">About</a></li>
          <li><a href="/#photos">Photos</a></li>
          <li><a href="/#reviews">Reviews</a></li>
          { this.editLink() }
        </ul>
      </nav>
    );
  }
}

export default withRouter(RestaurantNav);
