import { RECEIVE_ALL_TABLES,
  RECEIVE_SINGLE_TABLE,
  REMOVE_TABLE } from '../actions/table_actions';

const defaultState = {};

const TablesReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);
  let newState;

  switch(action.type) {
    case RECEIVE_ALL_TABLES:
      return action.tables;
    case RECEIVE_SINGLE_TABLE:
      newState = { [action.table.id]: action.table };
      return Object.assign({}, oldState, newState);
    case REMOVE_TABLE:
      newState = Object.assign({}, oldState);
      delete newState[action.table.id];
      return newState;
    default:
      return oldState;
  }
};

export default TablesReducer;
