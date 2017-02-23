import React from 'react';
import { connect } from 'react-redux';
import App from './app';
import SessionFormContainer from '../session/session_form_container';
import RestaurantMapContainer from '../restaurants/restaurant_map_container';
import ReviewFormContainer from '../reviews/review_form_container';
import RestaurantPhotoDetailContainer from '../restaurants/restaurant_photo_detail_container';
import { clearDropdown } from '../../actions/dropdown_actions';

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

const RestaurantPhotoDetail = props => {
  return <RestaurantPhotoDetailContainer { ...props } />;
};

const modals = {
  login: props => LoginForm(props),
  signup: props => SignupForm(props),
  map: props => RestaurantMapContainer(props),
  newReview: props => NewReviewForm(props),
  editReview: props => EditReviewForm(props),
  photo: props => RestaurantPhotoDetail(props)
};

const mapStateToProps = state => {
  const modal = state.modal.modal ? modals[state.modal.modal](state.modal.props) : null;

  return {
    modal,
    modalType: state.modal.modal,
    dropdown: state.dropdown
  };
};

const mapDispatchToProps = dispatch => ({
  clearDropdown: () => dispatch(clearDropdown())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
