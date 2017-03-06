import React from 'react';
import Scroll from 'react-scroll';
import { withRouter } from 'react-router';
import { currentUserIsOwner } from './restaurant_helper';

const Link = Scroll.Link;

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
        <li><Link to="location" smooth={true} duration={500}>Location</Link></li>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <nav className="restaurant-nav">
        <ul>
          <li><Link to="reservation" smooth={true} duration={500}>Reservation</Link></li>
          { this.locationLink() }
          <li><Link to="about" smooth={true} duration={500}>About</Link></li>
          <li><Link to="photos" smooth={true} duration={500}>Photos</Link></li>
          <li><Link to="reviews" smooth={true} duration={500}>Reviews</Link></li>
          { this.editLink() }
        </ul>
      </nav>
    );
  }
}

export default withRouter(RestaurantNav);
