import {
  ADD_SINGLE_CATEGORY,
  REMOVE_SINGLE_CATEGORY,
  REMOVE_ALL_CATEGORIES
} from '../actions/category_actions';

const defaultState = {};

const CategoriesReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);
  let newState;

  switch(action.type) {
    case ADD_SINGLE_CATEGORY:
      newState = Object.assign({}, oldState);
      newState[action.category] = true;
      debugger
      return newState;
    case REMOVE_SINGLE_CATEGORY:
      newState = Object.assign({}, oldState);
      newState[action.category] = false;
      return newState;
    case REMOVE_ALL_CATEGORIES:
      return defaultState;
    default:
      return oldState;
  }
};

export default CategoriesReducer;
