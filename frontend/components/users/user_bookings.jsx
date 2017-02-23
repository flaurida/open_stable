import React from 'react';
import BookingIndexItem from './booking_index_item';

class UserBookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fetching: true };
    this.renderIndexItems = this.renderIndexItems.bind(this);
  }

  componentDidMount() {
    this.props.requestCurrentUser(this.props.location.query).then(() => this.setState({ fetching: false}));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.bookings !== this.props.location.query.bookings) {
      this.props.requestCurrentUser(nextProps.location.query).then(() => this.setState({ fetching: false}));
    }
  }

  renderIndexItems() {
    return Object.values(this.props.bookings).map((booking, i) => {
      return <BookingIndexItem booking={ booking } key={ booking.id } deleteBooking={ this.props.deleteBooking }/>;
    });
  }

  render() {
    if (this.state.fetching) {
      return <div className="loader">Loading...</div>;
    }

    return (
      <div className="user-profile-item-container">
        { this.renderIndexItems() }
      </div>
    );
  }
}

export default UserBookings;
