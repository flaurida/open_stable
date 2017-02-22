import * as PhotoApiUtil from '../util/photo_api_util';
import { receiveNotices, clearNotices } from './notice_actions';
import { RECEIVE_ERRORS, CLEAR_ERRORS } from './error_actions';

export const RECEIVE_SINGLE_PHOTO = "RECEIVE_SINGLE_PHOTO";

const createPhotoMessage = () => (
  `Photo successfully added!`
);

export const createPhoto = (restaurantId, formData) => dispatch => {
  return PhotoApiUtil.createPhoto(restaurantId, formData).then(photo => {
    dispatch(receiveSinglePhoto(photo));
    dispatch(receiveNotices(createPhotoMessage()));
    dispatch(clearPhotoErrors());
  }, err => {
    dispatch(receivePhotoErrors(err.responseJSON));
  });
};

const receiveSinglePhoto = photo => ({
  type: RECEIVE_SINGLE_PHOTO,
  photo
});

const receivePhotoErrors = errors => ({
  type: RECEIVE_ERRORS,
  key: "photo",
  errors
});

const clearPhotoErrors = () => ({
  type: CLEAR_ERRORS,
  key: "photo"
});
