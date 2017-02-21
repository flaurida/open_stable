export const createBooking = booking => {
  return $.ajax({
    method: 'POST',
    url: 'api/bookings',
    data: { booking }
  });
};

export const deleteBooking = bookingId => {
  return $.ajax({
    method: 'DELETE',
    url: `api/bookings/${bookingId}`
  });
};
