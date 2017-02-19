import * as RestaurantApiUtil from '../util/restaurant_api_util';
import { RECEIVE_ERRORS, CLEAR_ERRORS } from './error_actions';
import { receiveNotices, clearNotices } from './notice_actions';

export const RECEIVE_ALL_RESTAURANTS = "RECEIVE_ALL_RESTAURANTS";
export const RECEIVE_SINGLE_RESTAURANT = "RECEIVE_SINGLE_RESTAURANT";
export const REMOVE_RESTAURANT = "REMOVE_RESTAURANT";
export const RECEIVE_RESTAURANT_SEARCH = "RECEIVE_RESTAURANT_SEARCH";

const createRestaurantMessage = restaurant => (
  `${restaurant.name} is now available for booking at OpenStable!`
);

const updateRestaurantMessage = restaurant => (
  `Operation Edit ${restaurant.name} was a success!`
);

const deleteRestaurantMessage = restaurant => (
  `We will miss you, ${restaurant.name} :(`
);

export const requestAllRestaurants = data => dispatch => {
  return RestaurantApiUtil.fetchRestaurants(data).then(restaurants => {
    dispatch(receiveAllRestaurants(restaurants));
  });
};

export const searchRestaurants = data => dispatch => {
  return RestaurantApiUtil.searchRestaurants(data).then(searchData => {
    dispatch(recieveRestaurantSearch(searchData));
  });
};

export const requestSingleRestaurant = id => dispatch => {
  return RestaurantApiUtil.fetchRestaurant(id).then(restaurant => {
    dispatch(receiveSingleRestaurant(restaurant));
  });
};

export const createRestaurant = restaurant => dispatch => {
  return RestaurantApiUtil.createRestaurant(restaurant).then(newRestaurant => {
    dispatch(receiveSingleRestaurant(newRestaurant));
    dispatch(clearRestaurantErrors());
    dispatch(receiveNotices(createRestaurantMessage(newRestaurant)));
    return newRestaurant;
  }, err => {
    dispatch(receiveRestaurantErrors(err.responseJSON));
  });
};

export const updateRestaurant = restaurant => dispatch => {
  return RestaurantApiUtil.updateRestaurant(restaurant).then(updatedRestaurant => {
    dispatch(receiveSingleRestaurant(updatedRestaurant));
    dispatch(clearRestaurantErrors());
    dispatch(receiveNotices(updateRestaurantMessage(updatedRestaurant)));
    return updatedRestaurant;
  }, err => {
    dispatch(receiveRestaurantErrors(err.responseJSON));
  });
};

export const deleteRestaurant = restaurant => dispatch => {
  return RestaurantApiUtil.deleteRestaurant(restaurant.id).then(() => {
    dispatch(removeRestaurant(restaurant));
    dispatch(clearRestaurantErrors());
    dispatch(receiveNotices(deleteRestaurantMessage(restaurant)));
    return restaurant;
  }, err => {
    dispatch(receiveRestaurantErrors(err.responseJSON));
  });
};

export const receiveAllRestaurants = restaurants => ({
  type: RECEIVE_ALL_RESTAURANTS,
  restaurants
});

const receiveSingleRestaurant = restaurant => ({
  type: RECEIVE_SINGLE_RESTAURANT,
  restaurant
});

const recieveRestaurantSearch = searchData => ({
  type: RECEIVE_RESTAURANT_SEARCH,
  searchData
});

const removeRestaurant = restaurant => ({
  type: REMOVE_RESTAURANT,
  restaurant
});

export const clearRestaurantErrors = () => ({
  type: CLEAR_ERRORS,
  key: "restaurant"
});

const receiveRestaurantErrors = errors => ({
  type: RECEIVE_ERRORS,
  key: "restaurant",
  errors
});
