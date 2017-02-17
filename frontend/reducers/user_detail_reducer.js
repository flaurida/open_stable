import { RECEIVE_SINGLE_USER } from '../actions/user_actions';

const defaultState = {};

const UserDetailReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_SINGLE_USER:
      return action.user;
    default:
      return oldState;
  }
};

export default UserDetailReducer;
