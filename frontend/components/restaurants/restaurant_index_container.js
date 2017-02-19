import { connect } from 'react-redux';
import { requestAllRestaurants, deleteRestaurant } from '../../actions/restaurant_actions';
import RestaurantIndex from './restaurant_index';

const mapStateToProps = state => ({
  restaurants: state.restaurants,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  requestAllRestaurants: data => dispatch(requestAllRestaurants(data)),
  deleteRestaurant: restaurant => dispatch(deleteRestaurant(restaurant))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantIndex);
