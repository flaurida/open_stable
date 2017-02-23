import React from 'react';
import { connect } from 'react-redux';
import App from './app';
import SessionFormContainer from '../session/session_form_container';
import RestaurantMapContainer from '../restaurants/restaurant_map_container';
import ReviewFormContainer from '../reviews/review_form_container';
import RestaurantPhotoDetailContainer from '../restaurants/restaurant_photo_detail_container';

const SignupForm = props => {
  return <SessionFormContainer { ...props } formType="signup" />;
};

const LoginForm = props => {
  return <SessionFormContainer { ...props } formType="login" />;
};

const NewReviewForm = props => {
  return <ReviewFormContainer { ...props } formType="new" />;
};

const EditReviewForm = props => {
  return <ReviewFormContainer { ...props } formType="edit" />;
};

const modals = {
  login: <LoginForm />,
  signup: <SignupForm />,
  map: <RestaurantMapContainer />,
  newReview: <NewReviewForm />,
  editReview: <EditReviewForm />,
  photo: <RestaurantPhotoDetailContainer />
};

const mapStateToProps = state => ({
  modal: modals[state.modal],
  modalType: state.modal
});

export default connect(
  mapStateToProps,
  null
)(App);
