export const fetchTables = restaurantId => {
  return $.ajax({
    method: 'GET',
    url: `api/restaurants/${restaurantId}/tables`
  });
};

export const fetchTable = tableId => {
  return $.ajax({
    method: 'GET',
    url: `api/tables/${tableId}`
  });
};

export const createTable = restaurantId => {
  return $.ajax({
    method: 'POST',
    url: `api/restaurants/${restaurantId}/tables`
  });
};

export const updateTable = table => {
  return $.ajax({
    method: 'PATCH',
    url: `api/tables/${table.id}`,
    data: { table }
  });
};

export const deleteTable = tableId => {
  return $.ajax({
    method: 'DELETE',
    url: `api/tables/${tableId}`
  });
};
