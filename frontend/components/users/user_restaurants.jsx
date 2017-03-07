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
    this.props.requestCurrentUser(this.props.location.query).then(() => this.setState({ fetching: false}));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.restaurants !== this.props.location.query.restaurants) {
      this.props.requestCurrentUser(nextProps.location.query).then(() => this.setState({ fetching: false}));
    }
  }

  renderIndexItems() {
    if (this.props.location.query.restaurants === "favorites") {
      return Object.keys(this.props.restaurants).map((restaurant, i) => (
        <RestaurantIndexItem restaurant={ this.props.restaurants[restaurant] } key={i}
          deleteRestaurant={ this.props.deleteRestaurant } currentUser={ this.props.currentUser }
          type="favoriteItem" />
      ));
    } else {
      return Object.keys(this.props.restaurants).map((restaurant, i) => (
        <RestaurantIndexItem restaurant={ this.props.restaurants[restaurant] } key={i}
          deleteRestaurant={ this.props.deleteRestaurant } currentUser={ this.props.currentUser } />
      ));
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
