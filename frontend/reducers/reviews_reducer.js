import { RECEIVE_SINGLE_REVIEW, REMOVE_REVIEW } from '../actions/review_actions';
import { RECEIVE_SINGLE_RESTAURANT } from '../actions/restaurant_actions';
import { RECEIVE_SINGLE_USER } from '../actions/user_actions';

const defaultState = {};

const ReviewsReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);
  let newState;

  switch(action.type) {
    case RECEIVE_SINGLE_RESTAURANT:
      return action.restaurant.reviews;
    case RECEIVE_SINGLE_REVIEW:
      newState = Object.assign({}, oldState);
      newState[action.review.id] = action.review;
      newState.current_user_review = action.review.id;
      return newState;
    case RECEIVE_SINGLE_USER:
      if (action.user.reviews) {
        return action.user.reviews;
      } else {
        return {};
      }
    case REMOVE_REVIEW:
      newState = Object.assign({}, oldState);
      delete newState[action.review.id];
      newState.current_user_review = null;
      return newState;
    default:
      return oldState;
  }
};

export default ReviewsReducer;
