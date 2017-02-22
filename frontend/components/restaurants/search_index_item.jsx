import React from 'react';
import { Link } from 'react-router';
import { BookingOptions } from './search_helper';
import { RestaurantDollarSigns } from './restaurant_helper';

class SearchIndexItem extends React.Component {
  searchIndexContent() {
    const { searchData, createBooking } = this.props;

    if (searchData.closed) {
      return (
        <div className="no-results-notice">
          We're sorry, this stable is closed at that time!
        </div>
      );
    }

    if (searchData.booked) {
      return (
        <div className="no-results-notice">
          Unfortunately this stable is completely booked at that time!
        </div>
      );
    }

    return (
      <BookingOptions searchData={ searchData.proposed_times } createBooking={ createBooking } />
    );
  }

  render() {
    const { searchData, createBooking } = this.props;
    const restaurantId = searchData.id;

    return (
      <div className="restaurant-index-item search-index-results">
        <div className="search-index-header">
          <Link to={ `/restaurants/${searchData.id}` }>
            <img src={ searchData.image_url } className="img-link" alt="restaurant"/>
          </Link>
          <h1>{ searchData.name }</h1>
          { searchData.category }
          <RestaurantDollarSigns numDollarSigns={ searchData.num_dollar_signs } />
        </div>
        { this.searchIndexContent() }
      </div>
    );
  }
}

export default SearchIndexItem;
