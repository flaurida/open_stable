import React from 'react';
import { connect } from 'react-redux';
import App from './app';
import SessionFormContainer from '../session/session_form_container';
import RestaurantMapContainer from '../restaurants/restaurant_map_container';

const SignupForm = props => {
  return <SessionFormContainer { ...props } formType="signup" />;
};

const LoginForm = props => {
  return <SessionFormContainer { ...props } formType="login" />;
};

const modals = {
  login: <LoginForm />,
  signup: <SignupForm />,
  map: <RestaurantMapContainer />
};

const mapStateToProps = state => ({
  modal: modals[state.modal],
  modalType: state.modal
});

export default connect(
  mapStateToProps,
  null
)(App);
