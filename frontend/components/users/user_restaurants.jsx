import React from 'react';
import { Link } from 'react-router';
import RestaurantIndexItem from '../restaurants/restaurant_index_item';

class UserRestaurants extends React.Component {
  componentDidMount() {
    this.props.requestCurrentUser();
  }

  render() {
    if (!this.props.user.restaurants) return null;
    const indexItems = this.props.user.restaurants.map((restaurant, i) => (
      <RestaurantIndexItem restaurant={ restaurant } key={i} />
    ));

    return (
      <div className="user-profile-item-container">
        <div className="create-link">
          <Link to="/restaurants/new">Create New Stable</Link>
        </div>
        <ul>
          { indexItems }
        </ul>
      </div>
    );
  }
}

export default UserRestaurants;
