import * as PhotoApiUtil from '../util/photo_api_util';
import { receiveNotices, clearNotices } from './notice_actions';
import { RECEIVE_ERRORS, CLEAR_ERRORS } from './error_actions';

export const RECEIVE_SINGLE_PHOTO = "RECEIVE_SINGLE_PHOTO";
export const RECEIVE_PHOTO_INDEX = "RECEIVE_PHOTO_INDEX";

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

export const receivePhotoIndex = photoIndex => ({
  type: RECEIVE_PHOTO_INDEX,
  photoIndex
});

export const incrementPhotoIndex = () => (dispatch, getState) => {
  dispatch(receivePhotoIndex((getState().photoIndex + 1) % getState().photos.length));
};

export const decrementPhotoIndex = () => (dispatch, getState) => {
  dispatch(receivePhotoIndex(calculateIndex(getState().photoIndex, getState().photos.length)));
};

const calculateIndex = (oldIndex, length) => {
  if (oldIndex >= 1) {
    return oldIndex - 1;
  } else {
    return length - 1;
  }
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
