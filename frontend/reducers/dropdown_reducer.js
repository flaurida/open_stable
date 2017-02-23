import { CLEAR_DROPDOWN, RECEIVE_DROPDOWN } from '../actions/dropdown_actions.js';

const defaultState = null;

const DropdownReducer = (oldState = defaultState, action) => {
  switch(action.type) {
    case RECEIVE_DROPDOWN:
      return action.dropdown;
    case CLEAR_DROPDOWN:
      return defaultState;
    default:
      return oldState;
  }
};

export default DropdownReducer;
