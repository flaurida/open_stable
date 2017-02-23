import RestaurantPhotos from './restaurant_photos';
import { connect } from 'react-redux';
import { receiveModal } from '../../actions/modal_actions';
import { receivePhotoIndex } from '../../actions/photo_actions';

const mapStateToProps = state => ({
  photos: state.photos
});

const mapDispatchToProps = dispatch => ({
  receiveModal: modal => dispatch(receiveModal(modal)),
  receivePhotoIndex: index => dispatch(receivePhotoIndex(index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantPhotos);
