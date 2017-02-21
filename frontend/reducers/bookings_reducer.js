import { RECEIVE_SINGLE_BOOKING,
  RECEIVE_ALL_BOOKINGS,
  REMOVE_BOOKING
} from '../actions/booking_actions';

const defaultState = {};

const BookingsReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);
  let newState;

  switch(action.type) {
    case RECEIVE_SINGLE_BOOKING:
      newState = Object.assign({}, oldState);
      newState[action.booking.id] = action.booking;
      return newState;
    case RECEIVE_ALL_BOOKINGS:
      return action.bookings;
    case REMOVE_BOOKING:
      newState = Object.assign({}, oldState);
      delete newState[action.booking.id];
      return newState;
    default:
      return oldState;
  }
};

export default BookingsReducer;
