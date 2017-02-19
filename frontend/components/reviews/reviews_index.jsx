import React from 'react';
import ReviewsIndexItem from './reviews_index_item';

class ReviewsIndex extends React.Component {
  reviewIndexItems() {
    return Object.values(this.props.reviews).map((review, i) => (
      <ReviewsIndexItem review={ review } key={i} />
    ));
  }

  render() {
    return (
      <section>
        <h2>{ this.props.restaurant.name } Ratings and Reviews</h2>
        { this.reviewIndexItems() }
      </section>
    );
  }
}

export default ReviewsIndex;
