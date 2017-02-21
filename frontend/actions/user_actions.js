import * as UserApiUtil from '../util/user_api_util';
import { receiveAllRestaurants } from './restaurant_actions';

export const RECEIVE_SINGLE_USER = "RECEIVE_SINGLE_USER";

export const requestCurrentUser = data => dispatch => {
  return UserApiUtil.fetchUser(data).then(user => {
    dispatch(receiveSingleUser(user));
    return user;
  });
};

const receiveSingleUser = user => ({
  type: RECEIVE_SINGLE_USER,
  user
});
