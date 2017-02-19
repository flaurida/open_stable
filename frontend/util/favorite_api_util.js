export const favoriteRestaurant = restaurantId => {
  return $.ajax({
    method: 'POST',
    url: `api/restaurants/${restaurantId}/favorite`
  });
};

export const unfavoriteRestaurant = id => {
  return $.ajax({
    method: 'DELETE',
    url: `api/favorites/${id}`
  });
};
