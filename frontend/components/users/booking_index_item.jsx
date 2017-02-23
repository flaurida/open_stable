import React from 'react';
import { Link } from 'react-router';

const BookingIndexItem = props => {
  const { booking, deleteBooking } = props;
  const formatted_seats = booking.num_seats > 1 ? `${booking.num_seats} horses` : `${booking.num_seats} horse`;
  const cancelButton = booking.upcoming ? <button className="booking-links" onClick={ () => deleteBooking(booking) }>Cancel</button> : null;

  return (
    <div className="booking-index-item">
      <Link to={ `/restaurants/${booking.restaurant_id}` }>
        <img src={ booking.restaurant_image_url } className="img-link" alt="restaurant-img"/>
      </Link>
      <div className="booking-details">
        <h1><Link to={ `/restaurants/${booking.restaurant_id}` }>
          { booking.restaurant_name }
        </Link></h1>
        <p>{ formatted_seats }</p>
        <p>{ booking.formatted_time }</p>
        { cancelButton }
      </div>
    </div>
  );
};

export default BookingIndexItem;
