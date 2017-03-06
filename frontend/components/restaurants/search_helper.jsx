import React from 'react';
import { withRouter } from 'react-router';

const BookingOption = ({ booking, createBooking, router }) => {
  if (booking.table_id) {
    return (
      <button onClick={ () => createBooking(booking).then(() => router.push("/profile")) } className="booking-button">
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

const BookingOptions = ({ searchData, createBooking, router }) => {
  const bookingOptions = searchData.map((booking, i) => (
    <BookingOption booking={ booking } createBooking={ createBooking } router={ router } key={i}/>
  ));

  return (
    <div className="booking-options">
      { bookingOptions }
    </div>
  );
};

export default withRouter(BookingOptions);
