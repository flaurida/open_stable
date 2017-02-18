import { connect } from 'react-redux';
import { requestAllRestaurants } from '../../actions/restaurant_actions';
import RestaurantSearch from './restaurant_search';

const mapStateToProps = state => ({
  restaurants: state.restaurants
});

const mapDispatchToProps = dispatch => ({
  requestAllRestaurants: () => dispatch(requestAllRestaurants())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantSearch)
