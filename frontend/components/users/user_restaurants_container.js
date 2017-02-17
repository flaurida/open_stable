import { connect } from 'react-redux';
import { requestCurrentUser } from '../../actions/user_actions';
import { deleteRestaurant } from '../../actions/restaurant_actions';
import UserRestaurants from './user_restaurants';

const mapStateToProps = state => ({
  user: state.userDetail,
  restaurants: state.restaurants,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  requestCurrentUser: id => dispatch(requestCurrentUser(id)),
  deleteRestaurant: restaurants => dispatch(deleteRestaurant(restaurants))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRestaurants);
