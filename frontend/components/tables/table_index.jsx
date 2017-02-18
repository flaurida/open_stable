import React from 'react';
import { Link } from 'react-router';
import TableIndexItem from './table_index_item';

class TableIndex extends React.Component {
  componentDidMount() {
    this.props.requestAllTables(this.props.params.restaurantId);
  }

  tableIndexItems() {
    return Object.values(this.props.tables).map((table, i) => (
        <TableIndexItem table={ table } key={i}/>
    ));
  }

  render() {
    return (
      <div className="table-index-container">
        { this.tableIndexItems() }
      </div>
    );
  }
}

export default TableIndex;
