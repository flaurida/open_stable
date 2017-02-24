import React from 'react';
import ReviewsIndexItem from './reviews_index_item';
import { ReviewStars } from './reviews_helper';

class ReviewsIndex extends React.Component {
  reviewIndexItems() {
    if (Object.keys(this.props.reviews).length <= 1) {
      return (
        <div>
          <p>{ this.props.restaurant.name } has not been reviewed yet.
            Why don't you be their first reviewer?</p>
        </div>
      );
    }

    return Object.values(this.props.reviews).map((review, i) => {
      if (!review || typeof review !== "object") return null;
      return <ReviewsIndexItem review={ review } key={review.id} />;
    });
  }

  reviewSummary() {
    if (Object.keys(this.props.reviews).length <= 1) return null;
    const { restaurant } = this.props;

    return (
      <div className="review-summary">
        <div className="review-summary-overall">
          <h1>{ restaurant.overall_rating }</h1>
          <div>
            <h3>Overall Rating</h3>
            <ReviewStars numStars={ restaurant.overall_rating } />
          </div>
        </div>

        <ul className="review-summary-detail">
          <li><p><span>Food</span>{ restaurant.food_rating }</p></li>
          <li><p><span>Service</span>{ restaurant.service_rating }</p></li>
          <li><p><span>Ambience</span>{ restaurant.ambience_rating }</p></li>
          <li><p><span>Value</span>{ restaurant.value_rating }</p></li>
          <li><p><span>Noise</span>{ restaurant.noise_rating }</p></li>
        </ul>

        <p className="review-recommend">
          <i className="fa fa-thumbs-up" aria-hidden="true"></i>
          { restaurant.recommended_score }% would recommend to another Khaleesi
        </p>
      </div>
    );
  }

  currentUserReview() {
    return this.props.reviews[this.props.reviews.current_user_review];
  }

  deleteButton() {
    const currentUserReview = this.currentUserReview();
    if (!currentUserReview) return null;

    return (
      <button onClick={ () => this.props.deleteReview(currentUserReview) }>Delete Your Review</button>
    );
  }

  render() {
    const currentUserReview = this.currentUserReview();
    const reviewMessage = currentUserReview ? "Edit Your Review" : "Write Review";
    const reviewFunction = currentUserReview ? () => this.props.receiveModal("editReview", { reviewId: this.props.reviews.current_user_review }) :
      () => this.props.receiveModal("newReview");

    return (
      <section id="reviews">
        <div className="reviews-header">
          <h2>{ this.props.restaurant.name } Ratings and Reviews</h2>
          { this.reviewSummary() }
          <button onClick={ reviewFunction }>{ reviewMessage }</button>
          { this.deleteButton() }
        </div>
        { this.reviewIndexItems() }
      </section>
    );
  }
}

export default ReviewsIndex;
