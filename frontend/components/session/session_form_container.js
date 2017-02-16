import { connect } from 'react-redux'
import { login, signup, clearSessionErrors } from '../../actions/session_actions';
import { receiveModal, clearModal } from '../../actions/modal_actions';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: !!state.session.currentUser,
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const processForm = ownProps.formType === "signup" ? signup : login;

  return {
    processForm: user => dispatch(processForm(user)),
    clearSessionErrors: () => dispatch(clearSessionErrors()),
    receiveModal: modal => dispatch(receiveModal(modal)),
    clearModal: () => dispatch(clearModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
