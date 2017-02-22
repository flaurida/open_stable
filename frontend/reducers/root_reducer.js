import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import notices from './notices_reducer';
import modal from './modal_reducer';
import restaurants from './restaurants_reducer';
import restaurantDetail from './restaurant_detail_reducer';
import userDetail from './user_detail_reducer';
import tables from './tables_reducer';
import tableDetail from './table_detail_reducer';
import searchData from './search_data_reducer';
import queryData from './query_data_reducer';
import reviews from './reviews_reducer';
import bookings from './bookings_reducer';
import photos from './photos_reducer';

export default combineReducers({
  session,
  errors,
  notices,
  modal,
  restaurants,
  restaurantDetail,
  userDetail,
  tables,
  tableDetail,
  searchData,
  queryData,
  reviews,
  bookings,
  photos
});
