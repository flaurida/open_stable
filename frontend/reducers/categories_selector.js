export const selectRestaurantIndexItems = (restaurants, categories) => {
  if (Object.keys(categories).length === 0) return restaurants;

  const selected = {};
  const restaurantArray = Object.keys(restaurants);

  for (let i = 0; i < restaurantArray.length; i++) {
    if (categories[restaurants[restaurantArray[i]].category]) {
      selected[restaurants[restaurantArray[i]].id] = restaurants[restaurantArray[i]];
    }
  }

  return selected;
};
