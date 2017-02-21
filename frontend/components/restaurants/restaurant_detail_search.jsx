import React from 'react';
import { BookingOptions } from './search_helper';
import Errors from '../errors/errors';

class RestaurantDetailSearch extends React.Component {
  componentWillMount() {
    this.props.clearSearchErrors();
  }

  render() {
    const { searchData, createBooking, errors } = this.props;
    const restaurantId = parseInt(this.props.restaurantId);

    if (!searchData[restaurantId]) {
      return <Errors errors={ errors } />;
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
          Unfortunately this stable is completely booked at that time!
        </div>
      );
    }

    return (
      <div>
        <Errors errors={ errors } />
        <BookingOptions searchData={ searchData[restaurantId].proposed_times } createBooking={ createBooking } />
      </div>
    );
  }
}

export default RestaurantDetailSearch;
