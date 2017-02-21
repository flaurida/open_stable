import React from 'react';
import { BookingOptions } from './search_helper';

class RestaurantDetailSearch extends React.Component {
  render() {
    const { searchData, createBooking } = this.props;
    const restaurantId = parseInt(this.props.restaurantId);

    if (!searchData[restaurantId]) {
      return null;
    }

    if (searchData[restaurantId].closed) {
      return (
        <div className="no-results-notice">
          We're sorry, this stable is closed at that time!
        </div>
      );
    }

    if (searchData[restaurantId].booked) {
      return (
        <div className="no-results-notice">
          We're sorry, this stable is completely booked at that time!
        </div>
      );
    }

    return <BookingOptions searchData={ searchData[restaurantId].proposed_times } createBooking={ createBooking } />;
  }
}

export default RestaurantDetailSearch;
