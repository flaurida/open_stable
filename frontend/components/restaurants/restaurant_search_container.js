import { connect } from 'react-redux';
import { searchRestaurants, clearSearchErrors, queryRestaurants, clearQueryData } from '../../actions/restaurant_actions';
import { createBooking } from '../../actions/booking_actions';
import RestaurantSearch from './restaurant_search';

const mapStateToProps = state => ({
  searchData: state.searchData,
  errors: state.errors.search,
  queryData: state.queryData
});

const mapDispatchToProps = dispatch => ({
  searchRestaurants: data => dispatch(searchRestaurants(data)),
  queryRestaurants: data => dispatch(queryRestaurants(data)),
  createBooking: booking => dispatch(createBooking(booking)),
  clearSearchErrors: () => dispatch(clearSearchErrors()),
  clearQueryData: () =>  dispatch(clearQueryData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantSearch);
