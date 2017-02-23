import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import AppContainer from './app/app_container';
import RestaurantIndexContainer from './restaurants/restaurant_index_container';
import RestaurantDetailContainer from './restaurants/restaurant_detail_container';
import RestaurantFormContainer from './restaurants/restaurant_form_container';
import UserProfileContainer from './users/user_profile_container';
import UserBookingsContainer from './users/user_bookings_container';
import UserRestaurantsContainer from './users/user_restaurants_container';
import UserReviewsContainer from './users/user_reviews_container';
import TableIndexContainer from './tables/table_index_container';
import RestaurantSearchContainer from './restaurants/restaurant_search_container';
import SplashPage from './splash/splash_page';

const Root = ({ store }) => {
  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={ AppContainer }>
        <IndexRoute component={ SplashPage } />
          <Route path="/search" component={ RestaurantSearchContainer } />
          <Route path="/restaurants" component={ RestaurantIndexContainer } />
          <Route path="/restaurants/new" component={ RestaurantFormContainer } />
          <Route path="/restaurants/:restaurantId/tables" component={ TableIndexContainer } />
          <Route path="/restaurants/:restaurantId/edit" component={ RestaurantFormContainer } />
          <Route path="/restaurants/:restaurantId" component={ RestaurantDetailContainer } />
          <Route path="/profile" component={ UserProfileContainer }>
            <Route path="/profile/bookings" component={ UserBookingsContainer } />
            <Route path="/profile/restaurants" component={ UserRestaurantsContainer } />
            <Route path="/profile/reviews" component={ UserReviewsContainer } />
          </Route>
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
