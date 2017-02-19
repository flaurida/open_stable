import { connect } from 'react-redux';
import { createReview, updateReview, clearReviewErrors } from '../../actions/review_actions';
import { clearModal } from '../../actions/modal_actions';
import ReviewForm from './review_form';

const mapStateToProps = (state, ownProps) => {
  let review;
  debugger
  if (ownProps.formType === "edit") {
    review = state.reviews[state.session.currentUser.id];
  } else {
    review = {
      overall_rating: null,
      food_rating: null,
      service_rating: null,
      ambience_rating: null,
      value_rating: null,
      noise_rating: null,
      recommended: true,
      body: ""
    };
  }

  return {
    review,
    errors: state.errors.review,
    restaurantId: state.restaurantDetail.id
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const processForm = ownProps.formType === "new" ? createReview : updateReview;

  return {
    processForm: (restaurantId, review) => dispatch(processForm(restaurantId, review)),
    clearModal: () => dispatch(clearModal()),
    clearReviewErrors: () => dispatch(clearReviewErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewForm);
