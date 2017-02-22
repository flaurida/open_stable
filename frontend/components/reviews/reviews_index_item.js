import React from 'react';
import { Link, withRouter } from 'react-router';
import { ReviewStars } from './reviews_helper';

class ReviewsIndexItem extends React.Component {
  render () {
    const { review, type, deleteReview, updateReview, receiveModal } = this.props;
    const header = (type !== "currentUserReviews") ? <h3 className="review-name">{ review.reviewer_name }</h3> :
      <h3 className="review-name"><Link to={ `/restaurants/${review.restaurant_id}` } className="reviews-link">{ review.restaurant_name}</Link></h3>;

    const editAndDeleteButtons = () => {
      if (type === "currentUserReviews") {
        return <button onClick={ () => this.props.receiveModal("editReview") }>Edit</button>;
      }

      return null;
    };

    return (
      <div className="reviews-index-item">
        <div className="review-content">
          <div className="review-header">
            <ReviewStars numStars={ review.overall_rating } />
            { header }
            { editAndDeleteButtons() }
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
