import { connect } from 'react-redux';
import { requestSingleRestaurant, createRestaurant, updateRestaurant } from '../../actions/restaurant_actions';
import RestaurantForm from './restaurant_form';

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.session.currentUser;
  const formType = ownProps.params.restaurantId ? "edit" : "new";

  let restaurant = {
    name: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    hours: "",
    description: ""
  };

  if (formType === "edit") restaurant = state.restaurantDetail;

  return { formType, restaurant, currentUser };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const processForm = ownProps.params.restaurantId ? updateRestaurant : createRestaurant;

  return {
    processForm: restaurant => dispatch(processForm(restaurant)),
    requestSingleRestaurant: id => dispatch(requestSingleRestaurant(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantForm);
