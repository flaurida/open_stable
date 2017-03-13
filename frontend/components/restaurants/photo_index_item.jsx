import React from 'react';

const PhotoIndexItem = props => {
  return (
    <img src={  props.photo.thumb_url }
      className="restaurant-detail-photo" alt="restaurant-photo"
      onClick={ props.displayPhoto(props.photoIndex) }/>
  );
};

export default PhotoIndexItem;
