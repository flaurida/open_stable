import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const mapStateToProps = state => ({
  queryData: state.queryData
});

class RestaurantQuery extends React.Component {
  restaurantListItems() {
    return this.props.queryData.restaurants.map((restaurant, i) => {
      return (
        <li key={i} onClick={ this.props.setQueryData(restaurant) } className="query-list-item">
          <span>{ restaurant.name }</span>{ restaurant.city }
        </li>
      );
    });
  }

  restaurantList() {
    if (this.props.queryData.restaurants.length === 0) return null;

    return (
      <ul className="query-results-section">
        <li className="query-results-header">
          <i className="fa fa-home" aria-hidden="true" />
          &nbsp;Stables
        </li>
        { this.restaurantListItems() }
      </ul>
    );
  }

  cityListItems() {
    return this.props.queryData.cities.map((city, i) => {
      return (
        <li key={i} onClick={ this.props.setQueryData(city) } className="query-list-item">
          <span>{ city.name }</span>
        </li>
      );
    });
  }

  cityList() {
    if (this.props.queryData.cities.length === 0) return null;

    return (
      <ul className="query-results-section">
        <li className="query-results-header">
          <i className="fa fa-map-marker" aria-hidden="true" />
          &nbsp;Cities
        </li>
        { this.cityListItems() }
      </ul>
    );
  }

  render() {
    if (this.props.queryData.restaurants.length === 0 && this.props.queryData.restaurants.length === 0) return null;

    return (
      <ul className="query-results">
        { this.cityList() }
        { this.restaurantList() }
      </ul>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(RestaurantQuery);
