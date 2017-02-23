export const ADD_SINGLE_CATEGORY = "ADD_SINGLE_CATEGORY";
export const REMOVE_SINGLE_CATEGORY = "REMOVE_SINGLE_CATEGORY";
export const REMOVE_ALL_CATEGORIES = "REMOVE_ALL_CATEGORIES";

export const addSingleCategory = category => ({
  type: ADD_SINGLE_CATEGORY,
  category
});

export const removeSingleCategory = category => ({
  type: REMOVE_SINGLE_CATEGORY,
  category
});

export const removeAllCategories = () => ({
  type: REMOVE_ALL_CATEGORIES
});
