import React from 'react';
import { Link, withRouter } from 'react-router';
import TableIndexItem from './table_index_item';
import TableFormContainer from './table_form_container';

class TableIndex extends React.Component {
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

  tableIndexItems() {
    return Object.values(this.props.tables).map((table, i) => (
      <TableIndexItem table={ table } deleteTable={ this.props.deleteTable } key={i}/>
    ));
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
