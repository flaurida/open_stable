import ReviewsIndex from './reviews_index';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  reviews: state.reviews
});

export default connect(
  mapStateToProps,
  null
)(ReviewsIndex);
