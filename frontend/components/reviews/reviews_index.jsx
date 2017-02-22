import React from 'react';
import ReviewsIndexItem from './reviews_index_item';

class ReviewsIndex extends React.Component {
  reviewIndexItems() {
    if (!Object.keys(this.props.reviews).length) {
      return (
        <div>
          <p>{ this.props.restaurant.name } has not been reviewed yet.
            Why don't you be their first reviewer?</p>
        </div>
      );
    }

    return Object.values(this.props.reviews).map((review, i) => {
      if (!review || typeof review !== "object") return null;
      return <ReviewsIndexItem review={ review } key={i} />;
    });
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
    const reviewFormType = currentUserReview ? "editReview" : "newReview";

    return (
      <section>
        <div className="reviews-header">
          <h2>{ this.props.restaurant.name } Ratings and Reviews</h2>
          <button onClick={ () => this.props.receiveModal(reviewFormType) }>{ reviewMessage }</button>
          { this.deleteButton() }
        </div>
        { this.reviewIndexItems() }
      </section>
    );
  }
}

export default ReviewsIndex;