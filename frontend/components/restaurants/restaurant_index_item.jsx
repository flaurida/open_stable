import React from 'react';
import { Link } from 'react-router';
import { RestaurantDollarSigns, currentUserIsOwner } from './restaurant_helper';
import { ReviewStars } from '../reviews/reviews_helper';
import FavoriteButtonContainer from './restaurant_favorites';

class RestaurantIndexItem extends React.Component {
  editAndDeleteLinks() {
    if (this.props.currentUser && currentUserIsOwner(this.props.currentUser, this.props.restaurant)) {

      return (
        <div className="edit-and-delete-links">
          <Link to={ `/restaurants/${this.props.restaurant.id}/edit`} className="restaurant-edit-link">
            Edit
          </Link>
          <button onClick={ () => this.props.deleteRestaurant(this.props.restaurant) }>
            Delete
          </button>
          <Link to={ `/restaurants/${this.props.restaurant.id}/tables` } className="restaurant-edit-link">
            View Stalls
          </Link>
        </div>
      );
    } else {
      return null;
    }
  }

  favoriteButton(restaurant) {
    if (this.props.type === "favoriteItem") {
      return <FavoriteButtonContainer restaurant={ restaurant } type="favoritesItem" />;
    } else {
      return <FavoriteButtonContainer restaurant={ restaurant } />;
    }
  }

  reviews() {
    const { restaurant } = this.props;

    if (restaurant.num_reviews > 0) {
      return (
        <div>
          <div className="restaurant-index-stars">
            <ReviewStars numStars={ restaurant.overall_rating } indexItem={ true }/>
            <p>({ restaurant.num_reviews })</p>
          </div>
          <p className="share-recommended">{ restaurant.recommended_score }% recommend</p>
        </div>
      );
    } else {
      return (
        <div className="restaurant-details">
          <p>No reviews yet</p>
        </div>
      );
    }
  }

  render() {
    const { restaurant } = this.props;

    return (
      <div className="restaurant-index-item">
        <div className="restaurant-notes">
          <Link to={ `/restaurants/${restaurant.id}` }>
            <img src={ restaurant.image_url } className="img-link" alt="restaurant"/>
          </Link>

          <div className="restaurant-notes-detail">
            <Link to={ `/restaurants/${restaurant.id}` }>
              { restaurant.name }
            </Link>
            <RestaurantDollarSigns numDollarSigns={ restaurant.num_dollar_signs } />
            <div className="restaurant-details">
              { this.reviews() }
              <p>{ restaurant.category } | { restaurant.city }</p>
              { this.editAndDeleteLinks() }
            </div>
          </div>
        </div>

        <div className="restaruant-reviews">
          <p>{ restaurant.review_preview }</p>
          { this.favoriteButton(restaurant) }
        </div>
      </div>
    );
  }
}

export default RestaurantIndexItem;
