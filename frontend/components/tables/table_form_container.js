import { connect } from 'react-redux';
import { requestSingleTable, createTable, updateTable, clearTableErrors } from '../../actions/table_actions';
import TableForm from './table_form';

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors.table
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const handleForm = ownProps.formType === "new" ? createTable : updateTable;

  return {
    handleForm: (restaurantId, table) => dispatch(handleForm(restaurantId, table)),
    requestSingleTable: id => dispatch(requestSingleTable(id)),
    clearTableErrors: () => dispatch(clearTableErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableForm);
