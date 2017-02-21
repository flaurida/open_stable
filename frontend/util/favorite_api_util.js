export const favoriteRestaurant = restaurantId => {
  return $.ajax({
    method: 'POST',
    url: `api/restaurants/${restaurantId}/favorites`
  });
};

export const unfavoriteRestaurant = restaurantId => {
  return $.ajax({
    method: 'DELETE',
    url: `api/restaurants/${restaurantId}/favorites`
  });
};
