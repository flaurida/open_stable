import { RECEIVE_ALL_FAVORITES,
  RECEIVE_SINGLE_FAVORITE,
  REMOVE_SINGLE_FAVORITE,
  REMOVE_ALL_FAVORITES } from '../actions/favorite_actions';

const defaultState = {};

const FavoritesReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_ALL_FAVORITES:
      return action.favorites;
    default:
      return oldState;
  }
};

export default FavoritesReducer;
