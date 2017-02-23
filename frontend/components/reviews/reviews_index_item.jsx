import React from 'react';
import { Link, withRouter } from 'react-router';
import { ReviewStars } from './reviews_helper';

class ReviewsIndexItem extends React.Component {
  header() {
    if (this.props.type !== "currentUserReviews") {
      return <h3 className="review-name">{ this.props.review.reviewer_name }</h3>;
    } else {
      return (
        <h3 className="review-name">
          <Link to={ `/restaurants/${this.props.review.restaurant_id}` } className="reviews-links">
            { this.props.review.restaurant_name}
          </Link>
        </h3>
      );
    }
  }

  editAndDeleteButtons() {
    if (this.props.type === "currentUserReviews") {
      debugger
      return (
        <div>
          <button className="reviews-links" onClick={ () => this.props.receiveModal("editReview", { reviewId: this.props.review.id }) }>Edit</button>
          <button className="reviews-links" onClick={ () => this.props.deleteReview(this.props.review) }>Delete</button>
        </div>
      );
    }

    return null;
  }

  render () {
    const { review } = this.props;

    return (
      <div className="reviews-index-item">
        <div className="review-content">
          <div className="review-header">
            <ReviewStars numStars={ review.overall_rating } />
            { this.header() }
            { this.editAndDeleteButtons() }
          </div>
          <p>{ review.body }</p>
        </div>

        <div className="review-ratings">
          <ul>
            <li>Food&nbsp;&nbsp;&nbsp;<span>{ review.food_rating }</span></li>
            <li>Ambience&nbsp;&nbsp;&nbsp;<span>{ review.ambience_rating }</span></li>
            <li>Service&nbsp;&nbsp;&nbsp;<span>{ review.service_rating }</span></li>
            <li>Value&nbsp;&nbsp;&nbsp;<span>{ review.value_rating }</span></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(ReviewsIndexItem);
