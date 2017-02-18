import { connect } from 'react-redux';
import { requestSingleTable, createTable, updateTable } from '../../actions/table_actions';
import TableForm from './table_form';

const mapStateToProps = (state, ownProps) => {
  let table = {
    name: "",
    min_seats: "",
    max_seats: "",
    dining_time: ""
  };

  if (ownProps.tableId) table = state.tables[ownProps.tableId];

  return { table };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const handleForm = ownProps.formType === "new" ? createTable : updateTable;

  return {
    handleForm: table => dispatch(handleForm(table)),
    requestSingleTable: id => dispatch(requestSingleTable(id))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(TableForm);
