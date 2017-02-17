import { connect } from 'react-redux';
import { requestSingleRestaurant } from '../../actions/restaurant_actions';
import RestaurantDetail from './restaurant_detail';

const mapStateToProps = state => ({
  restaurant: state.restaurantDetail
});

const mapDispatchToProps = dispatch => ({
  requestSingleRestaurant: id => dispatch(requestSingleRestaurant(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDetail);
