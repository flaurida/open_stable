import React from 'react';
import RestaurantPhotoFormContainer from './restaurant_photo_form_container';
import PhotoIndexItem from './photo_index_item';

class RestaurantPhotos extends React.Component {
  constructor(props) {
    super(props);

    this.displayPhoto = this.displayPhoto.bind(this);
  }

  photoIndexItems() {
    return (this.props.photos).map((photo, i) => {
      return <PhotoIndexItem photo={ photo } key={ photo.id } photoIndex={i}
        displayPhoto={ this.displayPhoto }/>;
    });
  }

  displayPhoto(index) {
    return e => {
      this.props.receiveModal("photo");
      this.props.receivePhotoIndex(index);
    };
  }

  render() {
    const { restaurant } = this.props;

    return (
      <section className="restaurant-photos-container" id="photos">
        <h2>{ restaurant.name } Photos</h2>
        <div className="restaurant-photos">{ this.photoIndexItems() }</div>
        <RestaurantPhotoFormContainer restaurantId={ restaurant.id } />
      </section>
    );
  }
}

export default RestaurantPhotos;
