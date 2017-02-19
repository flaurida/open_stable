import { RECEIVE_RESTAURANT_SEARCH } from '../actions/restaurant_actions';

const defaultState = {};

const searchDataReducer = (oldState = defaultState, action) => {
  Object.freeze(defaultState);

  switch(action.type) {
    case RECEIVE_RESTAURANT_SEARCH:
      return action.searchData;
    default:
      return oldState;
  }
};

export default searchDataReducer;
