import { RECEIVE_RESTAURANT_QUERY,
CLEAR_QUERY_DATA } from '../actions/restaurant_actions';

const defaultState = {
  restaurants: [],
  cities: []
};

const QueryDataReducer = (oldState = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_RESTAURANT_QUERY:
      return action.queryData;
    case CLEAR_QUERY_DATA:
      return defaultState;
    default:
      return oldState;
  }
};

export default QueryDataReducer;
