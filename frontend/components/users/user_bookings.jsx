import React from 'react';
import BookingIndexItem from './booking_index_item';

class UserBookings extends React.Component {
  constructor(props) {
    super(props);
    this.renderIndexItems = this.renderIndexItems.bind(this);
  }

  componentDidMount() {
    this.props.requestCurrentUser(this.props.location.query);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.bookings !== this.props.location.query.bookings) {
      this.props.requestCurrentUser(nextProps.location.query);
    }
  }

  renderIndexItems() {
    return Object.values(this.props.bookings).map((booking, i) => {
      return <BookingIndexItem booking={ booking } key={ booking.id } deleteBooking={ this.props.deleteBooking }/>;
    });
  }

  render() {
    return (
      <div className="user-profile-item-container">
        { this.renderIndexItems() }
      </div>
    );
  }
}

export default UserBookings;
