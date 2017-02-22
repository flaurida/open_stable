export const createPhoto = (restaurantId, formData) => {
  return $.ajax({
    method: 'POST',
    url: `api/restaurants/${restaurantId}/photos`,
    contentType: false,
    processData: false,
    data: formData
  });
};
