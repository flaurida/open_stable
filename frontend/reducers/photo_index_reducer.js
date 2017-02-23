import { RECEIVE_PHOTO_INDEX } from '../actions/photo_actions';

const defaultState = null;

const PhotoIndexReducer = (oldState = defaultState, action) => {
  switch(action.type) {
    case RECEIVE_PHOTO_INDEX:
      return action.photoIndex;
    default:
      return oldState;
  }
};

export default PhotoIndexReducer;
