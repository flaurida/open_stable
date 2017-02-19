export const createReview = (restaurantId, review) => {
  return $.ajax({
    method: 'POST',
    url: `api/restaurants/${restaurantId}/reviews`,
    data: { review }
  });
};

export const updateReview = (restaurantId, review) => {
  return $.ajax({
    method: 'PATCH',
    url: `api/restaurants/${restaurantId}/reviews/${review.id}`,
    data: { review }
  });
};

export const deleteReview = reviewId => {
  return $.ajax({
    method: 'DELETE',
    url: `api/reviews/${reviewId}`
  });
};
