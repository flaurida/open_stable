import { connect } from 'react-redux';
import { requestSingleRestaurant, createRestaurant, updateRestaurant } from '../../actions/restaurant_actions';
import RestaurantForm from './restaurant_form';

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.session.currentUser;
  const formType = ownProps.params.restaurantId ? "edit" : "new";
  const errors = state.errors.restaurant;

  let restaurant = {
    name: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    hours: {
      monday: ["9:00 am", "5:00 pm"],
      tuesday: ["9:00 am", "5:00 pm"],
      wednesday: ["9:00 am", "5:00 pm"],
      thursday: ["9:00 am", "5:00 pm"],
      friday: ["9:00 am", "5:00 pm"],
      saturday: ["12:00 pm", "5:00 pm"],
      sunday: ["10:00 am", "7:00 pm"]
    },
    description: "",
    price_range: ""
  };

  if (formType === "edit") restaurant = state.restaurantDetail;
  return { formType, restaurant, currentUser, errors };
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
