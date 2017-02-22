import RestaurantPhotos from './restaurant_photos';
import { connect } from 'react-redux';
import { receiveModal } from '../../actions/modal_actions';

const mapStateToProps = state => ({
  photos: state.photos
});

const mapDispatchToProps = dispatch => ({
  receiveModal: modal => dispatch(receiveModal(modal))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantPhotos);
