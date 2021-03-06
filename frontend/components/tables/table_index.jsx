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
    this.props.clearTableErrors();
  }

  componentDidMount() {
    this.props.requestAllTables(this.props.params.restaurantId);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.restaurantId && nextProps.params.restaurantId !== this.props.params.restaurantId) {
      this.props.requestAllTables(nextProps.params.restaurantId);
      this.props.clearTableErrors();
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
    return Object.keys(this.props.tables).map((table, i) => {
      if (this.state.editTableId === this.props.tables[table].id) {
        return <TableFormContainer formType="edit" restaurantId={ this.props.params.restaurantId } table={ this.props.tables[table] }
          updateEditState={ this.updateEditState } key={i}/>;
      } else {
        return <TableIndexItem table={ this.props.tables[table] } deleteTable={ this.props.deleteTable } updateEditState={ this.updateEditState } key={i}/>;
      }
    });
  }

  render() {
    if (Object.keys(this.props.tables).length === 0) return null;

    return (
      <div className="table-index-container">
        <h1><Link to={ `restaurants/${this.props.params.restaurantId}` }>{ this.props.tables[Object.keys(this.props.tables)[0]].restaurant_name }</Link> Stalls</h1>
        { this.tableIndexItems() }

        <h2>Create Stall</h2>
        <TableFormContainer formType="new" restaurantId={ this.props.params.restaurantId }/>
      </div>
    );
  }
}

export default withRouter(TableIndex);
