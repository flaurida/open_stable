import React from 'react';
import { withRouter } from 'react-router';

const BookingOption = ({ booking, createBooking, currentUser, receiveModal, router }) => {
  if (booking.table_id) {
    let bookingAction = () => createBooking(booking).then(() => router.push("/profile"));

    if (!currentUser) {
      bookingAction = () => receiveModal("login");
    }

    return (
      <button
        onClick={ bookingAction }
        className="booking-button"
      >
        { booking.pretty_time }
      </button>
    );
  } else {
    return (
      <button className="booking-button booking-button-blank">
      </button>
    );
  }
};

const BookingOptions = ({ searchData, createBooking, router, receiveModal, currentUser }) => {
  const bookingOptions = searchData.map((booking, i) => (
    <BookingOption booking={ booking }
      createBooking={ createBooking }
      receiveModal={ receiveModal }
      currentUser={ currentUser }
      router={ router }
      key={i}
    />
  ));

  return (
    <div className="booking-options">
      { bookingOptions }
    </div>
  );
};

export default withRouter(BookingOptions);
