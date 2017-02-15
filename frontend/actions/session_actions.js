import * as SessionApiUtil from '../util/session_api_util';
import { RECEIVE_ERRORS, CLEAR_ERRORS } from './error_actions';
import { receiveNotices, clearNotices } from './notice_actions';
import { clearModal } from './modal_actions';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";

const loginMessage = currentUser => (
  `Welcome back to OpenStable, ${currentUser.first_name} :)`
);

const logoutMessage = currentUser => (
  `Hope to see you back soon, ${currentUser.first_name}!`
);

const signupMessage = currentUser => (
  `Welcome back to OpenStable, ${currentUser.first_name} :)`
);

export const login = user => dispatch => {
  return SessionApiUtil.login(user).then(currentUser => {
    dispatch(receiveCurrentUser(currentUser));
    dispatch(clearSessionErrors());
    dispatch(clearModal());
    dispatch(receiveNotices([loginMessage(currentUser)]));
    return currentUser;
  }, err => {
    dispatch(receiveSessionErrors(err.responseJSON));
  });
};

export const logout = () => dispatch => {
  return SessionApiUtil.logout().then(currentUser => {
    dispatch(receiveCurrentUser(null));
    dispatch(clearSessionErrors());
    dispatch(receiveNotices(logoutMessage(currentUser)));
    return null;
  }, err => {
    dispatch(receiveSessionErrors(err.responseJSON));
  });
};

export const signup = user => dispatch => {
  return SessionApiUtil.signup(user).then(currentUser => {
    dispatch(receiveCurrentUser(currentUser));
    dispatch(clearSessionErrors());
    dispatch(clearModal());
    dispatch(receiveNotices(signupMessage(currentUser)));
    return currentUser;
  }, err => {
    dispatch(receiveSessionErrors(err.responseJSON));
  });
};

const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const clearSessionErrors = () => ({
  type: CLEAR_ERRORS,
  key: "session"
});

const receiveSessionErrors = errors => ({
  type: RECEIVE_ERRORS,
  key: "session",
  errors
});
