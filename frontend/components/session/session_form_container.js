import { connect } from 'react-redux'
import { login, signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => {
  const formType = ownProps.location.pathname === "/signup" ? "signup" : "login";

  return {
    loggedIn: !!state.session.currentUser,
    errors: state.errors.session,
    formType
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const processForm = ownProps.location.pathname === "/signup" ? signup : login;

  return {
    processForm: user => dispatch(processForm(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
