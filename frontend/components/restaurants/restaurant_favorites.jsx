import React from 'react';
import { connect } from 'react-redux';
import { favoriteRestaurant, unfavoriteRestaurant, requestAllFavorites } from '../../actions/favorite_actions';

const mapStateToProps = state => ({
  favorites: state.favorites
});

const mapDispatchToProps = dispatch => ({
  favoriteRestaurant: restaurantId => dispatch(favoriteRestaurant(restaurantId)),
  unfavoriteRestaurant: favorite => dispatch(unfavoriteRestaurant(favorite)),
  requestAllFavorites: () => dispatch(requestAllFavorites())
});

class FavoriteButton extends React.Component {
  componentWillMount() {
    this.props.requestAllFavorites();
  }

  componentWillReceiveProps() {
    this.props.requestAllFavorites();
  }

  render() {
    const { favorites, restaurant, unfavoriteRestaurant, favoriteRestaurant } = this.props;

    const currentUserFavorite = favorites[restaurant.id];
    const heartType = currentUserFavorite ? "fa-heart" : "fa-heart-o";
    const favoriteAction = currentUserFavorite ? () => unfavoriteRestaurant(currentUserFavorite) : () => favoriteRestaurant(restaurant.id);

    return (
      <div>
        <button onClick={ favoriteAction } className="favorite-button"><i className={ `fa ${heartType}` } aria-hidden="true"></i>
          <p>{ restaurant.favorites_count }</p>
        </button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteButton);
