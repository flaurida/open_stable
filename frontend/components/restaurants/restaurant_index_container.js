import { connect } from 'react-redux';
import { requestAllRestaurants } from '../../actions/restaurant_actions';
import RestaurantIndex from './restaurant_index';

const mapStateToProps = state => ({
  restaurants: state.restaurants
});

const mapDispatchToProps = dispatch => ({
  requestAllRestaurants: () => dispatch(requestAllRestaurants())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantIndex);
