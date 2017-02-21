import { connect } from 'react-redux';
import { searchRestaurants } from '../../actions/restaurant_actions';
import { createBooking } from '../../actions/booking_actions';
import RestaurantSearch from './restaurant_search';

const mapStateToProps = state => ({
  searchData: state.searchData
});

const mapDispatchToProps = dispatch => ({
  searchRestaurants: data => dispatch(searchRestaurants(data)),
  createBooking: booking => dispatch(createBooking(booking))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantSearch);
