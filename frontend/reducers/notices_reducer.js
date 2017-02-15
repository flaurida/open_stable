import { RECEIVE_NOTICES, CLEAR_NOTICES } from '../actions/notice_actions';

const defaultState = "";

const NoticesReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_NOTICES:
      return action.notices;
    case CLEAR_NOTICES:
      return "";
    default:
      return oldState;
  }
};

export default NoticesReducer;
