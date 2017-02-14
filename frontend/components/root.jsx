import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import SessionFormContainer from './session/session_form_container';

const SignupForm = props => {
  return <SessionFormContainer { ...props } />;
};

const LoginForm = props => {
  return <SessionFormContainer { ...props }/>;
};

const Root = ({ store }) => {
  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={ App }>
          <Route path="/signin" component={ LoginForm } />
          <Route path="/signup" component={ SignupForm } />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
