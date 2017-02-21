import { RECEIVE_RESTAURANT_SEARCH, CLEAR_SEARCH_DATA } from '../actions/restaurant_actions';

const defaultState = {};

const SearchDataReducer = (oldState = defaultState, action) => {
  Object.freeze(defaultState);

  switch(action.type) {
    case RECEIVE_RESTAURANT_SEARCH:
      return action.searchData;
    case CLEAR_SEARCH_DATA:
      return {};
    default:
      return oldState;
  }
};

export default SearchDataReducer;
