import React from 'react';
import { Link } from 'react-router';
import RestaurantIndexItem from '../restaurants/restaurant_index_item';

class UserRestaurants extends React.Component {
  constructor(props) {
    super(props);
    this.renderIndexItems = this.renderIndexItems.bind(this);
  }

  componentDidMount() {
    this.props.requestCurrentUser(this.props.location.query);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query !== this.props.location.query) {
      this.props.requestCurrentUser(nextProps.location.query);
    }
  }

  renderIndexItems() {
    return Object.values(this.props.restaurants).map((restaurant, i) => (
      <RestaurantIndexItem restaurant={ restaurant } key={i}
        deleteRestaurant={ this.props.deleteRestaurant } currentUser={ this.props.currentUser } />
    ));
  }

  render() {
    return (
      <div className="user-profile-item-container">
        <div className="create-link">
          <Link to="/restaurants/new">Create New Stable</Link>
        </div>
        <ul>
          { this.renderIndexItems() }
        </ul>
      </div>
    );
  }
}

export default UserRestaurants;
