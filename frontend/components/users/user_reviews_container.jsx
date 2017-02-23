import React from 'react';
import { connect } from 'react-redux';
import { requestCurrentUser } from '../../actions/user_actions';
import { deleteReview, updateReview } from '../../actions/review_actions';
import { receiveModal } from '../../actions/modal_actions';
import ReviewsIndexItem from '../reviews/reviews_index_item';

const mapStateToProps = state => ({
  user: state.userDetail,
  reviews: state.reviews,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  requestCurrentUser: data => dispatch(requestCurrentUser(data)),
  updateReview: (restaurantId, review) => dispatch(updateReview(restaurantId, review)),
  deleteReview: review => dispatch(deleteReview(review)),
  receiveModal: (modal, props) => dispatch(receiveModal(modal, props))
});

class UserReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fetching: true };
    this.renderIndexItems = this.renderIndexItems.bind(this);
  }

  componentDidMount() {
    this.props.requestCurrentUser(this.props.location.query).then(() => this.setState({ fetching: false }));
  }

  renderIndexItems() {
    return Object.values(this.props.reviews).map((review, i) => {
      if (review === null || typeof review !== "object") {
        return null;
      } else {
        return (
          <ReviewsIndexItem review={ review } key={review.id}
            deleteReview={ this.props.deleteReview }
            updateReview={ this.props.updateReview }
            receiveModal={ this.props.receiveModal }
            type="currentUserReviews"/>
        );
      }
    });
  }

  render() {
    if (this.state.fetching) {
      return <div className="loader">Loading...</div>;
    }

    return (
      <div className="user-profile-item-container">
        { this.renderIndexItems() }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserReviews);
