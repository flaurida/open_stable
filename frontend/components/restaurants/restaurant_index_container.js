import { connect } from 'react-redux';
import { fetchAllRestaurants } from '../../actions/restaurant_actions';
import RestaurantIndex from './restaurant_index';

const mapStateToProps = state => ({
  restaurants: state.restaurants
});

const mapDispatchToProps = dispatch => ({
  fetchAllRestaurants: () => dispatch(fetchAllRestaurants())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantIndex);
