import React from 'react';
import { connect } from 'react-redux'
import App from './app';
import SessionFormContainer from '../session/session_form_container';

const SignupForm = props => {
  return <SessionFormContainer { ...props } formType="signup" />;
};

const LoginForm = props => {
  return <SessionFormContainer { ...props } formType="login" />;
};

const modals = {
  login: <LoginForm />,
  signup: <SignupForm />
};

const mapStateToProps = state => ({
  modal: modals[state.modal]
});

export default connect(
  mapStateToProps,
  null
)(App);
