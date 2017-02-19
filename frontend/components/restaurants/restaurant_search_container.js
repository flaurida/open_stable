import { connect } from 'react-redux';
import { searchRestaurants } from '../../actions/restaurant_actions';
import RestaurantSearch from './restaurant_search';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  searchRestaurants: data => dispatch(searchRestaurants(data))
});

export default connect(
  null,
  mapDispatchToProps
)(RestaurantSearch);
