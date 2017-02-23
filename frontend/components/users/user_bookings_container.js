import { connect } from 'react-redux';
import { requestCurrentUser } from '../../actions/user_actions';
import { deleteBooking } from '../../actions/booking_actions';
import UserBookings from './user_bookings';

const mapStateToProps = state => ({
  bookings: state.bookings
});

const mapDispatchToProps = dispatch => ({
  deleteBooking: booking => dispatch(deleteBooking(booking)),
  requestCurrentUser: data => dispatch(requestCurrentUser(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBookings);
