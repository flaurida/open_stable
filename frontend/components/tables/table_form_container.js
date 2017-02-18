import { connect } from 'react-redux';
import { requestSingleTable, createTable, updateTable} from '../../actions/table_actions';
import TableForm from './table_form';

const mapStateToProps = (state, ownProps) => {
  const errors = ownProps.formType === "new" ? state.errors.table_new : state.errors.table_edit;

  return { errors };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const handleForm = ownProps.formType === "new" ? createTable : updateTable;

  return {
    handleForm: (restaurantId, table) => dispatch(handleForm(restaurantId, table)),
    requestSingleTable: id => dispatch(requestSingleTable(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableForm);
