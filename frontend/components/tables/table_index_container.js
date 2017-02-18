import { connect } from 'react-redux';
import { requestAllTables, deleteTable, clearTableErrors } from '../../actions/table_actions';
import TableIndex from './table_index';

const mapStateToProps = state => ({
  tables: state.tables,
  currentUser: state.session.currentUser,
  restaurant: state.restaurantDetail
});

const mapDispatchToProps = dispatch => ({
  requestAllTables: restaurantId => dispatch(requestAllTables(restaurantId)),
  deleteTable: table => dispatch(deleteTable(table)),
  clearTableErrors: () => dispatch(clearTableErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableIndex);
