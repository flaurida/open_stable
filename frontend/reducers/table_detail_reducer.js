import { RECEIVE_SINGLE_TABLE } from '../actions/table_actions';

const defaultState = {};

const TableDetailReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_SINGLE_TABLE:
      return action.table;
    default:
      return oldState;
  }
};

export default TableDetailReducer;
