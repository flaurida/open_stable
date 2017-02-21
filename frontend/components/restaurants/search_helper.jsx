import React from 'react';

const BookingOption = ({ booking, createBooking }) => {
  return (
    <button onClick={ () => createBooking(booking) } className="booking-button">
      { booking.pretty_time }
    </button>
  );
};

export const BookingOptions = ({ searchData, createBooking }) => {
  const bookingOptions = searchData.map((booking, i) => (
    <BookingOption booking={ booking } createBooking={ createBooking } key={i}/>
  ));

  return (
    <div className="booking-options">
      { bookingOptions }
    </div>
  );
};
