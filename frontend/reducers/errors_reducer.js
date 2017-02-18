import { RECEIVE_ERRORS, CLEAR_ERRORS } from '../actions/error_actions';
import { CLEAR_TABLE_ERRORS } from '../actions/table_actions';

const defaultState = {
  session: {},
  restaurant: {},
  table_new: {},
  table_edit: {}
};

const ErrorsReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);
  let newState;

  switch(action.type) {
    case RECEIVE_ERRORS:
      newState = { [action.key]: action.errors };
      return Object.assign({}, oldState, newState);
    case CLEAR_ERRORS:
      newState = Object.assign({}, oldState);
      newState[action.key] = {};
      return newState;
    case CLEAR_TABLE_ERRORS:
      newState = Object.assign({}, oldState);
      newState.table_new = {};
      newState.table_edit = {};
      return newState;
    default:
      return oldState;
  }
};

export default ErrorsReducer;
