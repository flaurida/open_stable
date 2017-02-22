import React from 'react';
import RestaurantPhotoFormContainer from './restaurant_photo_form_container';
import PhotoIndexItem from './photo_index_item';

class RestaurantPhotos extends React.Component {
  photoIndexItems() {
    return (this.props.photos).map((photo, i) => {
      return <PhotoIndexItem photo={ photo } key={i} />;
    });
  }

  render() {
    const { restaurant } = this.props;

    return (
      <section className="restaurant-photos-container">
        <h2>{ restaurant.name } Photos</h2>
        <div className="restaurant-photos">{ this.photoIndexItems() }</div>
        <RestaurantPhotoFormContainer restaurantId={ restaurant.id } />
      </section>
    );
  }
}

export default RestaurantPhotos;
