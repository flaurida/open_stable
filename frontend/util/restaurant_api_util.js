export const fetchRestaurants = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/restaurants'
  });
};

export const fetchRestaurant = id => {
  return $.ajax({
    method: 'GET',
    url: `api/restaurants/${id}`
  });
};

export const createRestaurant = formData => {
  return $.ajax({
    method: 'POST',
    url: 'api/restaurants',
    contentType: false,
    processData: false,
    data: formData
  });
};

export const updateRestaurant = formData => {
  debugger
  return $.ajax({
    method: 'PATCH',
    url: `api/restaurants/${formData.get("restaurant[id]")}`,
    contentType: false,
    processData: false,
    data: formData
  });
};

export const deleteRestaurant = id => {
  return $.ajax({
    method: 'DELETE',
    url: `api/restaurants/${id}`
  });
};
