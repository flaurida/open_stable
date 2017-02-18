import { connect } from 'react-redux';
import { requestAllTables } from '../../actions/table_actions';
import TableIndex from './table_index';

const mapStateToProps = state => ({
  tables: state.tables
});

const mapDispatchToProps = dispatch => ({
  requestAllTables: restaurantId => dispatch(requestAllTables(restaurantId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableIndex);
