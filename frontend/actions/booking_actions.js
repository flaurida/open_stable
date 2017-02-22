import * as BookingApiUtil from '../util/booking_api_util';
import { receiveNotices, clearNotices } from './notice_actions';
import { clearSearchData, receiveSearchErrors, clearSearchErrors } from './restaurant_actions';

export const RECEIVE_SINGLE_BOOKING = "RECEIVE_SINGLE_BOOKING";
export const RECEIVE_ALL_BOOKINGS = "RECEIVE_ALL_BOOKINGS";
export const REMOVE_BOOKING = "REMOVE_BOOKING";


const newBookingMessage = booking => (
  `You're all set for ${booking.num_seats} horses at ${booking.formatted_time}!`
);

const deletedBooking = booking => (
  `Your reservation for ${booking.num_seats} horses at ${booking.formatted_time} has been cancelled`
);

export const createBooking = booking => dispatch => {
  return BookingApiUtil.createBooking(booking).then(newBooking => {
    dispatch(receiveSingleBooking(booking));
    dispatch(receiveNotices(newBookingMessage(booking)));
    dispatch(clearSearchData());
    dispatch(clearSearchErrors());
  }, err => {
    dispatch(receiveSearchErrors(err.responseJSON));
  });
};

export const deleteBooking = booking => dispatch => {
  return BookingApiUtil.deleteBooking(booking.id).then(deletedBooking => {
    dispatch(removeBooking(booking));
    dispatch(receiveNotices(deletedBookingMessage(booking)));
  });
};

const receiveSingleBooking = booking => ({
  type: RECEIVE_SINGLE_BOOKING,
  booking
});

const receiveAllBookings = bookings => ({
  type: RECEIVE_ALL_BOOKINGS,
  bookings
});

const removeBooking = booking => ({
  type: REMOVE_BOOKING,
  booking
});
