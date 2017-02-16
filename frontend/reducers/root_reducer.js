import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import notices from './notices_reducer';
import modal from './modal_reducer';
import restaurants from './restaurants_reducer';
import restaurantDetail from './restaurant_detail_reducer';

export default combineReducers({
  session,
  errors,
  notices,
  modal,
  restaurants,
  restaurantDetail
});
