import { connect } from 'react-redux'
import Modal from './modal';
import { clearModal } from '../../actions/modal_actions';

const mapDispatchToProps = dispatch => ({
  clearModal: () => dispatch(clearModal())
})

export default connect(
  null,
  mapDispatchToProps
)(Modal);
