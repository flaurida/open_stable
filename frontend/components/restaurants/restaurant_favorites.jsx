import React from 'react';
import { connect } from 'react-redux';
import { receiveModal } from '../../actions/modal_actions';
import { favoriteRestaurant, unfavoriteRestaurant, unfavoriteFromFavoritesList  } from '../../actions/favorite_actions';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  favoriteRestaurant: restaurantId => dispatch(favoriteRestaurant(restaurantId)),
  unfavoriteRestaurant: restaurantId => dispatch(unfavoriteRestaurant(restaurantId)),
  unfavoriteFromFavoritesList: restaurantId => dispatch(unfavoriteFromFavoritesList(restaurantId)),
  receiveModal: modalType => dispatch(receiveModal(modalType))
});

class FavoriteButton extends React.Component {
  render() {
    const { restaurant,
      unfavoriteRestaurant,
      favoriteRestaurant,
      unfavoriteFromFavoritesList,
      currentUser
     } = this.props;

    const currentUserFavorite = restaurant.favorites.current_user_favorite;
    const heartType = currentUserFavorite ? "fa-heart" : "fa-heart-o";
    let favoriteAction;
    
    if (!currentUser) {
      favoriteAction = () => this.props.receiveModal("login");
    }
    else if (this.props.type === "favoritesItem") {
      favoriteAction = () => unfavoriteFromFavoritesList(restaurant.id);
    } else {
      favoriteAction = currentUserFavorite ? () => unfavoriteRestaurant(restaurant.id) : () => favoriteRestaurant(restaurant.id);
    }

    return (
      <div className="favorite-button">
        <button onClick={ favoriteAction } className="favorite-button"><i className={ `fa ${heartType}` } aria-hidden="true"></i>
          <p>{ restaurant.favorites.favorites_count }</p>
        </button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteButton);
