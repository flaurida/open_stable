import { connect } from 'react-redux';
import { requestAllRestaurants, deleteRestaurant } from '../../actions/restaurant_actions';
import { createBooking } from '../../actions/booking_actions';
import RestaurantIndex from './restaurant_index';
import { selectRestaurantIndexItems } from '../../reducers/categories_selector';

const mapStateToProps = state => ({
  restaurants: selectRestaurantIndexItems(state.restaurants, state.categories),
  searchData: selectRestaurantIndexItems(state.searchData, state.categories),
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  requestAllRestaurants: data => dispatch(requestAllRestaurants(data)),
  deleteRestaurant: restaurant => dispatch(deleteRestaurant(restaurant)),
  createBooking: booking => dispatch(createBooking(booking))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantIndex);
