import { connect } from 'react-redux';
import { requestAllRestaurants } from '../../actions/restaurant_actions';
import RestaurantSearch from './restaurant_search';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  requestAllRestaurants: data => dispatch(requestAllRestaurants(data))
});

export default connect(
  null,
  mapDispatchToProps
)(RestaurantSearch);
