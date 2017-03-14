import React from 'react';
import { Link } from 'react-router';
import RestaurantIndexItem from '../restaurants/restaurant_index_item';

class UserRestaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fetching: true };
    this.renderIndexItems = this.renderIndexItems.bind(this);
  }

  componentDidMount() {
    this.props.requestCurrentUser(this.props.location.query).then(() => this.setState({ fetching: false }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.restaurants !== this.props.location.query.restaurants) {
      this.setState({ fetching: true });
      this.props.requestCurrentUser(nextProps.location.query).then(() => this.setState({ fetching: false }));
    }
  }

  favoriteRestaurants() {
    if (Object.keys(this.props.restaurants).length <= 0) {
      return <p>No favorites yet!</p>;
    }

    return Object.keys(this.props.restaurants).map((restaurant, i) => (
      <RestaurantIndexItem restaurant={ this.props.restaurants[restaurant] } key={i}
        deleteRestaurant={ this.props.deleteRestaurant } currentUser={ this.props.currentUser }
        type="favoriteItem" />
    ));
  }

  ownedRestaurants() {
    if (Object.keys(this.props.restaurants).length <= 0) {
      return <p>You don't own any stables yet!</p>;
    }

    return Object.keys(this.props.restaurants).map((restaurant, i) => (
      <RestaurantIndexItem restaurant={ this.props.restaurants[restaurant] } key={i}
        deleteRestaurant={ this.props.deleteRestaurant } currentUser={ this.props.currentUser } />
    ));
  }

  renderIndexItems() {
    if (this.props.location.query.restaurants === "favorites") {
      return this.favoriteRestaurants();
    } else {
      return this.ownedRestaurants();
    }
  }

  createLink() {
    if (this.props.location.query.restaurants === "mine") {
      return (
        <div className="create-link">
          <Link to="/restaurants/new">Create New Stable</Link>
        </div>
      );
    }

    return null;
  }

  render() {
    if (this.state.fetching) {
      return <div className="loader">Loading...</div>;
    }

    return (
      <div className="user-profile-item-container">
        { this.createLink() }
        <ul>
          { this.renderIndexItems() }
        </ul>
      </div>
    );
  }
}

export default UserRestaurants;
