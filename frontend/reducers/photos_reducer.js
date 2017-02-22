import { RECEIVE_SINGLE_PHOTO } from '../actions/photo_actions';
import { RECEIVE_SINGLE_RESTAURANT } from '../actions/restaurant_actions';
import merge from 'lodash/merge';

const defaultState = {};

const PhotosReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_SINGLE_RESTAURANT:
      return action.restaurant.photos;
    case RECEIVE_SINGLE_PHOTO:
      const newState = merge({}, oldState);
      newState[action.photo.id] = action.photo;
      return newState;
    default:
      return oldState;
  }
};

export default PhotosReducer;
