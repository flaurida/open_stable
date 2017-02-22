import { RECEIVE_ALL_RESTAURANTS,
  RECEIVE_SINGLE_RESTAURANT,
  REMOVE_RESTAURANT } from '../actions/restaurant_actions';
import { RECEIVE_SINGLE_USER } from '../actions/user_actions';
import { RECEIVE_SINGLE_FAVORITE,
  REMOVE_SINGLE_FAVORITE,
  REMOVE_FAVORITED_RESTAURANT } from '../actions/favorite_actions';
import merge from 'lodash/merge';

const defaultState = {};

const RestaurantsReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);
  let newState;

  switch(action.type) {
    case RECEIVE_ALL_RESTAURANTS:
      return action.restaurants;
    case RECEIVE_SINGLE_RESTAURANT:
      newState = { [action.restaurant.id]: action.restaurant };
      return Object.assign({}, oldState, newState);
    case RECEIVE_SINGLE_USER:
      if (action.user.restaurants) {
        return action.user.restaurants;
      } else {
        return {};
      }
    case REMOVE_RESTAURANT:
      newState = Object.assign({}, oldState);
      delete newState[action.restaurant.id];
      return newState;
    case RECEIVE_SINGLE_FAVORITE:
      newState = merge({}, oldState);
      newState[action.favorite.restaurant_id].favorites.favorites_count++;
      newState[action.favorite.restaurant_id].favorites.current_user_favorite = true;
      return newState;
    case REMOVE_SINGLE_FAVORITE:
      newState = merge({}, oldState);
      newState[action.favorite.restaurant_id].favorites.favorites_count--;
      newState[action.favorite.restaurant_id].favorites.current_user_favorite = false;
      return newState;
    case REMOVE_FAVORITED_RESTAURANT:
      newState = merge({}, oldState);
      delete newState[action.favorite.restaurant_id];
      return newState;
    default:
      return oldState;
  }
};

export default RestaurantsReducer;
