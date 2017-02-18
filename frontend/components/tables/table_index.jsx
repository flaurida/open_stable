import React from 'react';
import { Link, withRouter } from 'react-router';
import TableIndexItem from './table_index_item';
import TableFormContainer from './table_form_container';

class TableIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editTableId: null };
    this.updateEditState = this.updateEditState.bind(this);
  }

  componentWillMount() {
    this.redirectUnlessLoggedIn();
  }

  componentDidMount() {
    this.props.requestAllTables(this.props.params.restaurantId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.restaurantId && nextProps.restaurantId !== this.props.params.restaurantId) {
      this.props.requestAllTables(this.props.params.restaurantId);
    }
  }

  redirectUnlessLoggedIn() {
    if (!this.props.currentUser) {
      this.props.router.push("/");
    }
  }

  updateEditState(table) {
    if (!table) {
      this.setState({ editTableId: null});
    } else {
      this.setState({ editTableId: table.id });
    }
  }

  tableIndexItems() {
    return Object.values(this.props.tables).map((table, i) => {
      if (this.state.editTableId === table.id) {
        return <TableFormContainer formType="edit" restaurantId={ this.props.params.restaurantId } table={ table }
          updateEditState={ this.updateEditState } key={i}/>;
      } else {
        return <TableIndexItem table={ table } deleteTable={ this.props.deleteTable } updateEditState={ this.updateEditState } key={i}/>;
      }
    });
  }

  render() {
    return (
      <div className="table-index-container">
        { this.tableIndexItems() }

        <TableFormContainer formType="new" restaurantId={ this.props.params.restaurantId }/>
      </div>
    );
  }
}

export default withRouter(TableIndex);
