import React from 'react';
import { connect } from 'react-redux';
import { favoriteRestaurant, unfavoriteRestaurant } from '../../actions/favorite_actions';

const mapDispatchToProps = dispatch => ({
  favoriteRestaurant: restaurantId => dispatch(favoriteRestaurant(restaurantId)),
  unfavoriteRestaurant: favorite => dispatch(unfavoriteRestaurant(favorite))
});

class FavoriteButton extends React.Component {
  render() {
    const { restaurant, unfavoriteRestaurant, favoriteRestaurant } = this.props;

    const currentUserFavorite = restaurant.favorites.current_user_favorite;
    const heartType = currentUserFavorite ? "fa-heart" : "fa-heart-o";
    const favoriteAction = currentUserFavorite ? () => unfavoriteRestaurant(restaurant.id) : () => favoriteRestaurant(restaurant.id);

    return (
      <div>
        <button onClick={ favoriteAction } className="favorite-button"><i className={ `fa ${heartType}` } aria-hidden="true"></i>
          <p>{ restaurant.favorites.favorites_count }</p>
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(FavoriteButton);
