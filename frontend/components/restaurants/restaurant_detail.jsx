import React from 'react';
import RestaurantNav from './restaurant_nav';
import RestaurantLocationContainer from './restaurant_location_container';

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
      <div className="restaurant-detail">
        <div className="restaurant-header-wrapper">
          <img src={ window.images.dothrakiBanner } className="img-restaurant-banner" alt="dothraki-banner" />

          <div className="restaurant-header">
            <img src={ window.images.restaurantPhoto } className="img-restaurant-detail" alt="restaurant"/>
            <div className="restaurant-header-notes">
              <h1>{ restaurant.name }</h1>
              <p>Category&nbsp;&nbsp;|&nbsp;&nbsp;{ restaurant.city }&nbsp;&nbsp;|&nbsp;&nbsp;{ restaurant.price_range }</p>
            </div>
          </div>
        </div>

        <div className="restaurant-body">
          <RestaurantNav restaurant={ restaurant } />
          <section className="restaurant-body-detail">
            <RestaurantLocationContainer restaurant={ restaurant } />

            <section className="restaurant-description">
              <h2>About { restaurant.name }</h2>
              <p>{ restaurant.description }</p>

              <p className="hours-header">Hours of Operation</p>
              <ul>
                { restaurant.formatted_hours.map((hour, i) => <li key={i}>{ hour }</li>) }
              </ul>
            </section>
          </section>
        </div>
      </div>
    );
  }
}

export default RestaurantDetail;
