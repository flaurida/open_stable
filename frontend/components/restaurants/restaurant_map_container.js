import { connect } from 'react-redux';
import RestaurantMap from './restaurant_map';

const mapStateToProps = state => ({
  restaurant: state.restaurantDetail
});

export default connect(
  mapStateToProps,
  null
)(RestaurantMap);
