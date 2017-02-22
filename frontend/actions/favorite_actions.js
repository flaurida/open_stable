import * as FavoriteApiUtil from '../util/favorite_api_util';

export const RECEIVE_ALL_FAVORITES = "RECEIVE_ALL_FAVORITES";
export const RECEIVE_SINGLE_FAVORITE = "RECEIVE_SINGLE_FAVORITE";
export const REMOVE_SINGLE_FAVORITE = "REMOVE_SINGLE_FAVORITE";
export const REMOVE_ALL_FAVORITES = "REMOVE_ALL_FAVORITES";
export const REMOVE_FAVORITED_RESTAURANT = "REMOVE_FAVORITED_RESTAURANT";

export const favoriteRestaurant = restaurantId => dispatch => {
  return FavoriteApiUtil.favoriteRestaurant(restaurantId).then(favorite => {
    dispatch(receiveSingleFavorite(favorite));
  });
};

export const unfavoriteRestaurant = restaurantId => dispatch => {
  return FavoriteApiUtil.unfavoriteRestaurant(restaurantId).then(deletedFavorite => {
    dispatch(removeSingleFavorite(deletedFavorite));
  });
};

export const unfavoriteFromFavoritesList = restaurantId => dispatch => {
  debugger
  return FavoriteApiUtil.unfavoriteRestaurant(restaurantId).then(deletedFavorite => {
    dispatch(removeFavoritedRestaurant(deletedFavorite));
  });
};

const receiveSingleFavorite = favorite => ({
  type: RECEIVE_SINGLE_FAVORITE,
  favorite
});

const removeSingleFavorite = favorite => ({
  type: REMOVE_SINGLE_FAVORITE,
  favorite
});

const removeFavoritedRestaurant = favorite => ({
  type: REMOVE_FAVORITED_RESTAURANT,
  favorite
});
