import { RECEIVE_NOTICES, CLEAR_NOTICES } from '../actions/notice_actions';

const defaultState = {
  session: []
};

const NoticesReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);
  let newState;

  switch(action.type) {
    case RECEIVE_NOTICES:
      newState = { [action.key]: action.notices };
      return Object.assign({}, oldState, newState);
    case CLEAR_NOTICES:
      newState = Object.assign({}, oldState);
      newState[action.key] = [];
      return newState;
    default:
      return oldState;
  }
};

export default NoticesReducer;
