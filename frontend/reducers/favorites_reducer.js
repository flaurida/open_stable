import { RECEIVE_ALL_FAVORITES,
  RECEIVE_SINGLE_FAVORITE,
  REMOVE_SINGLE_FAVORITE,
  REMOVE_ALL_FAVORITES } from '../actions/favorite_actions';

const defaultState = {};

const FavoritesReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);
  let newState;

  switch(action.type) {
    case RECEIVE_ALL_FAVORITES:
      return action.favorites;
    case RECEIVE_SINGLE_FAVORITE:
    debugger
      newState = Object.assign({}, oldState);
      newState[action.favorite.restaurant_id] = action.favorite;
      return newState;
    case REMOVE_SINGLE_FAVORITE:
    debugger
      newState = Object.assign({}, oldState);
      delete newState[action.favorite.restaurant_id];
      return newState;
    case REMOVE_ALL_FAVORITES:
      return {};
    default:
      return oldState;
  }
};

export default FavoritesReducer;
