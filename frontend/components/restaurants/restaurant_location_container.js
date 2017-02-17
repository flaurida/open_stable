import { connect } from 'react-redux';
import { receiveModal, clearModal } from '../../actions/modal_actions';
import RestaurantLocation from './restaurant_location';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  receiveModal: modal => dispatch(receiveModal(modal)),
  clearModal: () => dispatch(clearModal())
});

export default connect(
  null,
  mapDispatchToProps
)(RestaurantLocation);
