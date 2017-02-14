import * as SessionApiUtil from '../util/session_api_util';
import { RECEIVE_ERRORS, CLEAR_ERRORS } from './error_actions';
import { receiveNotices, clearNotices } from './notice_actions';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";

export const login = user => dispatch => {
  return SessionApiUtil.login(user).then(currentUser => {
    dispatch(receiveCurrentUser(currentUser));
    dispatch(clearSessionErrors());
    dispatch(receiveNotices([`Welcome back to OpenStable, ${currentUser.first_name} :)`]));
    return currentUser;
  }, err => {
    dispatch(receiveSessionErrors(err.responseJSON));
    dispatch(clearNotices());
  });
};

export const logout = () => dispatch => {
  return SessionApiUtil.logout().then(currentUser => {
    dispatch(receiveCurrentUser(null));
    dispatch(clearSessionErrors());
    dispatch(receiveNotices(["Hope to see you back soon!"]));
    return null;
  }, err => {
    dispatch(receiveSessionErrors(err.responseJSON));
    dispatch(clearNotices());
  });
};

export const signup = user => dispatch => {
  return SessionApiUtil.signup(user).then(currentUser => {
    dispatch(receiveCurrentUser(currentUser));
    dispatch(clearSessionErrors());
    dispatch(receiveNotices([`Welcome back to OpenStable, ${currentUser.first_name} :)`]));
    return currentUser;
  }, err => {
    dispatch(receiveSessionErrors(err.responseJSON));
    dispatch(clearNotices());
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
