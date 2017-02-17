import { connect } from 'react-redux';
import { requestCurrentUser } from '../../actions/user_actions';
import UserRestaurants from './user_restaurants';

const mapStateToProps = state => ({
  user: state.userDetail
});

const mapDispatchToProps = dispatch => ({
  requestCurrentUser: id => dispatch(requestCurrentUser(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRestaurants);
