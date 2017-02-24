import { RECEIVE_SINGLE_RESTAURANT } from '../actions/restaurant_actions';
import { RECEIVE_SINGLE_FAVORITE, REMOVE_SINGLE_FAVORITE } from '../actions/favorite_actions';
import { RECEIVE_SINGLE_REVIEW, UPDATE_SINGLE_REVIEW, REMOVE_REVIEW } from '../actions/review_actions';
import { noiseRating } from '../components/reviews/reviews_helper';
import merge from 'lodash/merge';

const defaultState = {};

const RestaurantDetailReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);
  let newState;

  switch(action.type) {
    case RECEIVE_SINGLE_RESTAURANT:
      return action.restaurant;
    case RECEIVE_SINGLE_FAVORITE:
      newState = merge({}, oldState);

      if (newState.favorites) {
        newState.favorites.favorites_count++;
        newState.favorites.current_user_favorite = true;
      }

      return newState;
    case REMOVE_SINGLE_FAVORITE:
      newState = merge({}, oldState);

      if (newState.favorites) {
        newState.favorites.favorites_count--;
        newState.favorites.current_user_favorite = false;
      }

      return newState;
    case RECEIVE_SINGLE_REVIEW:
      newState = merge({}, oldState);
      if (!newState.name) return newState;

      newState.overall_rating = addReviewRecalculation(newState, "overall_rating", action.review.overall_rating);
      newState.food_rating = addReviewRecalculation(newState, "food_rating", action.review.food_rating);
      newState.ambience_rating = addReviewRecalculation(newState, "ambience_rating", action.review.ambience_rating);
      newState.service_rating = addReviewRecalculation(newState, "service_rating", action.review.service_rating);
      newState.value_rating = addReviewRecalculation(newState, "value_rating", action.review.value_rating);
      newState.recommended_score = addReviewRecalculation(newState, "recommended_score", action.review.recommended);
      newState.num_reviews++;

      return newState;
    case UPDATE_SINGLE_REVIEW:
      newState = merge({}, oldState);
      if (!newState.name) return newState;
      debugger
      newState.overall_rating = editReviewRecalculation(newState, "overall_rating", action.review.overall_rating, action.oldReview.overall_rating);
      newState.food_rating = editReviewRecalculation(newState, "food_rating", action.review.food_rating, action.oldReview.food_rating);
      newState.ambience_rating = editReviewRecalculation(newState, "ambience_rating", action.review.ambience_rating, action.oldReview.ambience_rating);
      newState.service_rating = editReviewRecalculation(newState, "service_rating", action.review.service_rating, action.oldReview.service_rating);
      newState.value_rating = editReviewRecalculation(newState, "value_rating", action.review.value_rating, action.oldReview.value_rating);
      newState.recommended_score = editReviewRecalculation(newState, "recommended_score", action.review.recommended, action.oldReview.recommended);

      return newState;
    case REMOVE_REVIEW:
      newState = merge({}, oldState);
      if (!newState.name) return newState;
      debugger
      newState.overall_rating = deleteReviewRecalculation(newState, "overall_rating", action.review.overall_rating);
      newState.food_rating = deleteReviewRecalculation(newState, "food_rating", action.review.food_rating);
      newState.ambience_rating = deleteReviewRecalculation(newState, "ambience_rating", action.review.ambience_rating);
      newState.service_rating = deleteReviewRecalculation(newState, "service_rating", action.review.service_rating);
      newState.value_rating = deleteReviewRecalculation(newState, "value_rating", action.review.value_rating);
      newState.recommended_score = deleteReviewRecalculation(newState, "recommended_score", action.review.recommended);
      newState.num_reviews--;

      return newState;
    default:
      return oldState;
  }
};

const addReviewRecalculation = (restaurant, attribute, newScore) => {
  if (attribute === "recommended_score") {
    let total = restaurant[attribute] / 100 * restaurant.num_reviews;
    if (newScore) {
      total++;
    }

    return Math.round((total / (restaurant.num_reviews + 1) * 100));
  }

  const oldTotal = parseFloat(restaurant[attribute]) * restaurant.num_reviews;

  if (attribute !== "noise_rating") {
    return ((oldTotal + newScore) / (restaurant.num_reviews + 1)).toFixed(1).toString();
  }

  return noiseRatings[Math.round((oldTotal + newScore) / (restaurant.num_reviews + 1)) - 1];
};

const editReviewRecalculation = (restaurant, attribute, newScore, oldScore) => {
  if (newScore === oldScore) return newScore;

  if (attribute === "recommended_score") {
    let total = restaurant[attribute] / 100 * restaurant.num_reviews;
    if (newScore) {
      total++;
    } else {
      total --;
    }

    return Math.round((total / restaurant.num_reviews * 100));
  }

  const oldTotal = parseFloat(restaurant[attribute]) * restaurant.num_reviews;

  if (attribute !== "noise_rating") {
    return ((oldTotal - oldScore + newScore) / (restaurant.num_reviews)).toFixed(1).toString();
  }

  return noiseRatings[Math.round((oldTotal - oldScore + newScore) / restaurant.num_reviews) - 1];
};

const deleteReviewRecalculation = (restaurant, attribute, oldScore) => {
  if (attribute === "recommended_score") {
    let total = restaurant[attribute] / 100 * restaurant.num_reviews;
    if (oldScore) {
      total--;
    }

    return Math.round((total / (restaurant.num_reviews - 1) * 100));
  }

  const oldTotal = parseFloat(restaurant[attribute]) * restaurant.num_reviews;

  if (attribute !== "noise_rating") {
    return ((oldTotal - oldScore) / (restaurant.num_reviews - 1)).toFixed(1).toString();
  }

  return noiseRatings[Math.round((oldTotal - oldScore) / (restaurant.num_reviews - 1)) - 1];
};

export default RestaurantDetailReducer;
