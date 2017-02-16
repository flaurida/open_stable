import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import AppContainer from './app/app_container';
import RestaurantIndexContainer from './restaurants/restaurant_index_container';
import RestaurantDetailContainer from './restaurants/restaurant_detail_container';
import RestaurantFormContainer from './restaurants/restaurant_form_container';

const Root = ({ store }) => {
  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={ AppContainer }>
          <Route path="/restaurants" component={ RestaurantIndexContainer } />
          <Route path="/restaurants/new" component={ RestaurantFormContainer } />
          <Route path="/restaurants/:restaurantId/edit" component={ RestaurantFormContainer } />
          <Route path="/restaurants/:restaurantId" component={ RestaurantDetailContainer } />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
