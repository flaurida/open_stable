import React from 'react';

const PhotoIndexItem = props => {
  return (
    <img src={  props.photo.image_url }
      className="restaurant-detail-photo" alt="restaurant-photo"/>
  );
};

export default PhotoIndexItem;
