import RestaurantPhotoForm from './restaurant_photo_form';
import { connect } from 'react-redux';
import { createPhoto } from '../../actions/photo_actions';

const mapDispatchToProps = dispatch => ({
  createPhoto: (restaurantId, photo) => dispatch(createPhoto(restaurantId, photo))
});

export default connect(
  null,
  mapDispatchToProps
)(RestaurantPhotoForm);
