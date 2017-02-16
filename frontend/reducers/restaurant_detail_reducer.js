import { RECEIVE_SINGLE_RESTAURANT } from '../actions/restaurant_actions';

const defaultState = {};

const RestaurantDetailReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_SINGLE_RESTAURANT:
      return action.restaurant;
    default:
      return oldState;
  }
};

export default RestaurantDetailReducer;
