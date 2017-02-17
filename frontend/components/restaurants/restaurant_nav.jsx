import React from 'react';
import { Link, withRouter } from 'react-router';

class RestaurantNav extends React.Component {
  editLink() {
    if (this.props.restaurant.owner_viewing) {
      return (
        <li><Link to={ `/restaurants/${this.props.restaurant.id}/edit`}>
          Edit
        </Link></li>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <nav className="restaurant-nav">
        <ul>
          <li><a href="#">Reservation</a></li>
          <li><a href="#">Location</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Photos</a></li>
          <li><a href="#">Reviews</a></li>
          { this.editLink() }
        </ul>
      </nav>
    );
  }
}

export default withRouter(RestaurantNav);
