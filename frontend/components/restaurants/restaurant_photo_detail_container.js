import { connect } from 'react-redux';
import { receivePhotoIndex, incrementPhotoIndex, decrementPhotoIndex } from '../../actions/photo_actions';
import RestaurantPhotoDetail from './restaurant_photo_detail';

const mapStateToProps = state => ({
  photo: state.photos[state.photoIndex]
});

const mapDispatchToProps = dispatch => ({
  incrementPhotoIndex: () => dispatch(incrementPhotoIndex()),
  decrementPhotoIndex: () => dispatch(decrementPhotoIndex())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantPhotoDetail);
