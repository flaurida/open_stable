import ReviewsIndex from './reviews_index';
import { connect } from 'react-redux';
import { receiveModal } from '../../actions/modal_actions';
import { deleteReview } from '../../actions/review_actions';

const mapStateToProps = state => ({
  reviews: state.reviews,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  receiveModal: modal => dispatch(receiveModal(modal)),
  deleteReview: review => dispatch(deleteReview(review))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewsIndex);
