import { RECEIVE_ALL_RESTAURANTS,
RECEIVE_SINGLE_RESTAURANT,
REMOVE_RESTAURANT } from '../actions/restaurant_actions';
import { RECEIVE_SINGLE_USER } from '../actions/user_actions';

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
      return action.user.restaurants;
    case REMOVE_RESTAURANT:
      newState = Object.assign({}, oldState);
      delete newState[action.restaurant.id];
      return newState;
    default:
      return oldState;
  }
};

export default RestaurantsReducer;
