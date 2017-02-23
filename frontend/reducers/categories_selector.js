export const selectRestaurantIndexItems = (restaurants, categories) => {
  if (Object.keys(categories).length === 0) return restaurants;

  const selected = {};
  const restaurantArray = Object.values(restaurants);

  for (let i = 0; i < restaurantArray.length; i++) {
    if (categories[restaurantArray[i].category]) {
      selected[restaurantArray[i].id] = restaurantArray[i];
    }
  }

  return selected;
};
