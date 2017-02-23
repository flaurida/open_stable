import React from 'react';
import RestaurantIndexItem from './restaurant_index_item';
import SearchIndexItem from './search_index_item';
import RestaurantSearchContainer from './restaurant_search_container';
import CategorySelectContainer from '../categories/category_select_container';
import { Link } from 'react-router';

class RestaurantIndex extends React.Component {
  componentDidMount() {
    if (this.props.location.query.type === "search") {
    } else {
      this.props.requestAllRestaurants(this.props.location.query);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query !== this.props.location.query) {
      if (this.props.location.query.type === "search") {
      } else {
        this.props.requestAllRestaurants(nextProps.location.query);
      }
    }
  }

  restaurantIndexItems() {
    if (this.props.location.query.type === "search") {
      return Object.values(this.props.searchData).map((searchData, i) => (
        <SearchIndexItem key={i} searchData={ searchData } createBooking={ this.props.createBooking }/>
      ));
    }

    return Object.values(this.props.restaurants).map((restaurant, i) => (
      <RestaurantIndexItem key={i} restaurant={ restaurant }
        deleteRestaurant={ this.props.deleteRestaurant } currentUser={ this.props.currentUser }/>
    ));
  }

  render() {
    return (
      <div className="index-container">
        <div className="splash-container">
          <h1>Find a reservation for your entire horde</h1>
          <img src={ window.images.splashPhoto } alt="Dothraki"/>
          <RestaurantSearchContainer title="Make a reservation" splash= { true }/>
        </div>

        <CategorySelectContainer />

        <div className="restaurant-index">
          <ul>
            { this.restaurantIndexItems() }
          </ul>
        </div>
      </div>
    );
  }
}

export default RestaurantIndex;
