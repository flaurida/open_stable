import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import AppContainer from './app/app_container';


const Root = ({ store }) => {
  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={ AppContainer }>
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
