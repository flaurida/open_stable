import React from 'react';
import Errors from '../errors/errors';
import { SeatSelect, DiningTimeSelect } from './table_form_helper';

class TableForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnMount() {
    this.resetForm();
    this.props.clearTableErrors();
  }

  initialState() {
    if (this.props.table) {
      return this.props.table;
    } else {
      return {
        name: "",
        min_seats: "",
        max_seats: "",
        dining_time: ""
      };
    }
  }

  resetForm() {
    this.props.clearTableErrors();
    this.setState({
      name: "",
      min_seats: "",
      max_seats: "",
      dining_time: ""
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let that = this;
    this.props.handleForm(this.props.restaurantId, this.state).then(() => {
      this.props.updateEditState(null);
    });
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  render() {
    const message = this.props.formType === "new" ? "Create" : "Update";
    const { name, min_seats, max_seats, dining_time } = this.state;
    const { errors } = this.props;

    return (
      <div className="table-form-container">

        <Errors errors={ errors } />

        <form className="table-form" onSubmit={ this.handleSubmit }>
          <input type="text" value={ name } placeholder="Name *" onChange={ this.handleChange("name") }
            className={ errors.name ? "input-error" : "" }/>

          <SeatSelect type="min_seats" handleChange={ this.handleChange } value={ min_seats } errors={ errors }/>
          <SeatSelect type="max_seats" handleChange={ this.handleChange } value={ max_seats } errors={ errors }/>
          <DiningTimeSelect handleChange={ this.handleChange } value={ dining_time } errors={ errors }/>

          <input type="submit" value={ message } className="table-form-submit" />
        </form>
      </div>
    );
  }
}

export default TableForm;
