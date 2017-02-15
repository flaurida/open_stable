import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import notices from './notices_reducer';
import modal from './modal_reducer';

export default combineReducers({
  session,
  errors,
  notices,
  modal
});
