import { connect } from 'react-redux';
import { requestCurrentUser } from '../../actions/user_actions';
import UserProfile from './user_profile';

const mapStateToProps = state => ({
  user: state.userDetail
});

const mapDispatchToProps = dispatch => ({
  requestCurrentUser: id => dispatch(requestCurrentUser(id))
});

export default connect(
  mapStateToProps,
  null
)(UserProfile);
