import React from 'react';

const BookingOption = ({ booking, createBooking }) => {
  if (booking.table_id) {
    return (
      <button onClick={ () => createBooking(booking) } className="booking-button">
        { booking.pretty_time }
      </button>
    );
  } else {
    return (
      <button className="booking-button booking-button-blank">
      </button>
    )
  }
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
