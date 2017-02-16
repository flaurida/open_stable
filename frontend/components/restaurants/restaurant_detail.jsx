import React from 'react';

class RestaurantDetail extends React.Component {
  componentDidMount() {
    this.props.requestSingleRestaurant(this.props.params.restaurantId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.restaurantId !== nextProps.params.restaurantId) {
      this.props.requestSingleRestaurant(nextProps.params.restaurantId);
    }
  }

  render() {
    const { restaurant } = this.props;
    if (!restaurant.name) return null;

    return (
      <div className="restaurant-index-item">
        <h1>{ restaurant.name }</h1>
        <div className="restaurant-notes">
          <p>{ restaurant.price_range }</p>
        </div>

        <div className="restaurant-location">
          <p>{ restaurant.address }</p>
          <p>{ restaurant.city }, { restaurant.state }, { restaurant.zip_code }</p>
        </div>

        <div className="restaurant-description">
          <p>{ restaurant.description }</p>
          // ADD HOURS
        </div>
      </div>
    )
  }
}

export default RestaurantDetail;
