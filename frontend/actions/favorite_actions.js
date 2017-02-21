import * as FavoriteApiUtil from '../util/favorite_api_util';

export const RECEIVE_ALL_FAVORITES = "RECEIVE_ALL_FAVORITES";
export const RECEIVE_SINGLE_FAVORITE = "RECEIVE_SINGLE_FAVORITE";
export const REMOVE_SINGLE_FAVORITE = "REMOVE_SINGLE_FAVORITE";
export const REMOVE_ALL_FAVORITES = "REMOVE_ALL_FAVORITES";

export const requestAllFavorites = () => dispatch => {
  return FavoriteApiUtil.fetchUserFavorites().then(favorites => {
    dispatch(receiveAllFavorites(favorites));
  });
};

export const favoriteRestaurant = restaurantId => dispatch => {
  return FavoriteApiUtil.favoriteRestaurant(restaurantId).then(favorite => {
    dispatch(receiveSingleFavorite(favorite));
  });
};

export const unfavoriteRestaurant = favorite => dispatch => {
  return FavoriteApiUtil.unfavoriteRestaurant(favorite.id).then(deletedFavorite => {
    dispatch(removeSingleFavorite(deletedFavorite));
  });
};

const receiveAllFavorites = favorites => ({
  type: RECEIVE_ALL_FAVORITES,
  favorites
});

const receiveSingleFavorite = favorite => ({
  type: RECEIVE_SINGLE_FAVORITE,
  favorite
});

const removeSingleFavorite = favorite => ({
  type: REMOVE_SINGLE_FAVORITE,
  favorite
});

export const clearAllFavorites = () => ({
  type: REMOVE_ALL_FAVORITES
});
