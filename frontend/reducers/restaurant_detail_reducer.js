import { RECEIVE_SINGLE_RESTAURANT } from '../actions/restaurant_actions';
import { RECEIVE_SINGLE_FAVORITE, REMOVE_SINGLE_FAVORITE } from '../actions/favorite_actions';
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
      newState.favorites_count++;
      return newState;
    case REMOVE_SINGLE_FAVORITE:
      newState = merge({}, oldState);
      newState.favorites_count--;
      return newState;
    default:
      return oldState;
  }
};

export default RestaurantDetailReducer;
