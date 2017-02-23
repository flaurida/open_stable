import React from 'react';

class RestaurantPhotoDetail extends React.Component {
  render() {
    return (
      <div className="modal-center-photo-container">
        <div className="modal-center-photo-buttons">
          <button onClick={ this.props.decrementPhotoIndex }>
            <i className="fa fa-arrow-left" aria-hidden="true" />
          </button>
          <button onClick={ this.props.incrementPhotoIndex }>
            <i className="fa fa-arrow-right" aria-hidden="true" />
          </button>
        </div>
        <img className="modal-photo" src={ this.props.photo.image_url }/>
      </div>
    );
  }
}

export default RestaurantPhotoDetail;
