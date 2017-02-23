import { RECEIVE_NOTICES, CLEAR_NOTICES } from '../actions/notice_actions';

const defaultState = null;

const NoticesReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_NOTICES:
      return action.notices;
    case CLEAR_NOTICES:
      return defaultState;
    default:
      return oldState;
  }
};

export default NoticesReducer;
