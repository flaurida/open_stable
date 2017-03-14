import { RECEIVE_SINGLE_RESTAURANT } from '../actions/restaurant_actions';
import { RECEIVE_SINGLE_FAVORITE, REMOVE_SINGLE_FAVORITE } from '../actions/favorite_actions';
import { RECEIVE_SINGLE_REVIEW, UPDATE_SINGLE_REVIEW, REMOVE_REVIEW } from '../actions/review_actions';
import { noiseRating } from '../components/reviews/reviews_helper';
import merge from 'lodash/merge';

const defaultState = {};

const RestaurantDetailReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);
  let newState;

  switch(action.type) {
    case RECEIVE_SINGLE_RESTAURANT:
      return action.restaurant;
    case RECEIVE_SINGLE_FAVORITE:
      newState = merge({}, oldState);

      if (newState.favorites) {
        newState.favorites.favorites_count++;
        newState.favorites.current_user_favorite = true;
      }

      return newState;
    case REMOVE_SINGLE_FAVORITE:
      newState = merge({}, oldState);

      if (newState.favorites) {
        newState.favorites.favorites_count--;
        newState.favorites.current_user_favorite = false;
      }

      return newState;
    case RECEIVE_SINGLE_REVIEW:
    case REMOVE_REVIEW:
      return merge({}, oldState, action.review.updated_ratings);
    default:
      return oldState;
  }
};

export default RestaurantDetailReducer;
