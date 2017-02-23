import { connect } from 'react-redux';
import { clearNotices } from '../../actions/notice_actions';
import Notices from './notices';

const mapStateToProps = state => ({
  notices: state.notices
});

const mapDispatchToProps = dispatch => ({
  clearNotices: () => dispatch(clearNotices())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notices);
