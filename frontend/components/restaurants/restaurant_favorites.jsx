import React from 'react';
import { connect } from 'react-redux';
import { favoriteRestaurant, unfavoriteRestaurant, unfavoriteFromFavoritesList  } from '../../actions/favorite_actions';

const mapDispatchToProps = dispatch => ({
  favoriteRestaurant: restaurantId => dispatch(favoriteRestaurant(restaurantId)),
  unfavoriteRestaurant: restaurantId => dispatch(unfavoriteRestaurant(restaurantId)),
  unfavoriteFromFavoritesList: restaurantId => dispatch(unfavoriteFromFavoritesList(restaurantId))
});

class FavoriteButton extends React.Component {
  render() {
    const { restaurant, unfavoriteRestaurant, favoriteRestaurant } = this.props;

    const currentUserFavorite = restaurant.favorites.current_user_favorite;
    const heartType = currentUserFavorite ? "fa-heart" : "fa-heart-o";
    let favoriteAction;

    if (this.props.type === "favoritesItem") {
      favoriteAction = () => unfavoriteFromFavoritesList(restaurant.id);
    } else {
      favoriteAction = currentUserFavorite ? () => unfavoriteRestaurant(restaurant.id) : () => favoriteRestaurant(restaurant.id);
    }

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
