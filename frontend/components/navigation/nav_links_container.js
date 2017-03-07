import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { receiveModal, clearModal } from '../../actions/modal_actions';
import NavLinks from './nav_links';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  receiveModal: (modal, props) => dispatch(receiveModal(modal, props)),
  clearModal: () => dispatch(clearModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavLinks);
