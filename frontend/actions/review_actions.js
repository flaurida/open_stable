import * as ReviewApiUtil from '../util/review_api_util';
import { RECEIVE_ERRORS, CLEAR_ERRORS } from './error_actions';
import { receiveNotices, clearNotices } from './notice_actions';

export const RECEIVE_SINGLE_REVIEW = "RECEIVE_SINGLE_REVIEW";
export const REMOVE_REVIEW = "REMOVE_VIEW";

const createReviewMessage = () => (
  `Thank you for your review!`
);

const updateReviewMessage = () => (
  `Operation Edit Your Review was a success!`
);

const deleteReviewMessage = () => (
  `Review deleted :(`
);

export const createReview = (restaurantId, review) => dispatch => {
  return ReviewApiUtil.createReview(restaurantId, review).then(newReview => {
    dispatch(receiveSingleReview(newReview));
    dispatch(clearReviewErrors());
    dispatch(receiveNotices(createReviewMessage()));
    return newReview;
  }, err => {
    dispatch(receiveReviewErrors(err.responseJSON));
  });
};

export const updateReview = (restaurantId, review) => dispatch => {
  return ReviewApiUtil.updateReview(restaurantId, review).then(updatedReview => {
    dispatch(receiveSingleReview(updatedReview));
    dispatch(clearReviewErrors());
    dispatch(receiveNotices(updateReviewMessage()));
    return newReview;
  }, err => {
    dispatch(receiveReviewErrors(err.responseJSON));
  });
};

export const deleteReview = review => dispatch => {
  return ReviewApiUtil.deleteReview(review.id).then(() => {
    dispatch(removeReview(reviewId));
    dispatch(clearReviewErrors());
    dispatch(receiveNotices(deleteReviewMessage()));
    return reviewId;
  }, err => {
    dispatch(receiveReviewErrors(err.responseJSON));
  });
};

const receiveSingleReview = review => ({
  type: RECEIVE_SINGLE_REVIEW,
  review
});

const removeReview = review => ({
  type: REMOVE_REVIEW,
  review
});

const receiveReviewErrors = errors => ({
  type: RECEIVE_ERRORS,
  key: "review",
  errors
});

export const clearReviewErrors = () => ({
  type: CLEAR_ERRORS,
  key: "review"
});
