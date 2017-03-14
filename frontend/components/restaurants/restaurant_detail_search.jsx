import React from 'react';
import BookingOptions from './search_helper';
import Errors from '../errors/errors';

class RestaurantDetailSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.clearSearchErrors();
  }

  errorRender() {
    if (this.props.errors) {
      return <Errors errors={ this.props.errors } />;
    }

    return null;
  }

  render() {
    const { searchData, createBooking, errors, currentUser, receiveModal } = this.props;
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
        { this.errorRender() }
        <BookingOptions
          searchData={ searchData[restaurantId].proposed_times }
          createBooking={ createBooking }
          currentUser={ currentUser }
          receiveModal={ receiveModal }
        />
      </div>
    );
  }
}

export default RestaurantDetailSearch;
