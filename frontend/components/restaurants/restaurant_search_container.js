import { connect } from 'react-redux';
import { searchRestaurants, clearSearchErrors } from '../../actions/restaurant_actions';
import { createBooking } from '../../actions/booking_actions';
import RestaurantSearch from './restaurant_search';

const mapStateToProps = state => ({
  searchData: state.searchData,
  errors: state.errors.search
});

const mapDispatchToProps = dispatch => ({
  searchRestaurants: data => dispatch(searchRestaurants(data)),
  createBooking: booking => dispatch(createBooking(booking)),
  clearSearchErrors: () => dispatch(clearSearchErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantSearch);
