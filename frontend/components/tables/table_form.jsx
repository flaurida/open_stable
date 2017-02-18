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

  componentWillMount() {
    this.resetForm();
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
    this.props.handleForm(this.props.restaurantId, this.state).then(() => {
      this.resetForm();
    });
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  render() {
    const message = this.props.formType === "new" ? "Create Stall" : "Update Stall";
    const { name, min_seats, max_seats, dining_time } = this.state;
    const { errors } = this.props;

    return (
      <div className="table-form-page">
        <div className="form-container table-form-container">
          <h1 className="form-header">{ message }</h1>

          <Errors errors={ errors } />

          <form className="table-form" onSubmit={ this.handleSubmit }>
            <input type="text" value={ name } placeholder="Name *" onChange={ this.handleChange("name") }
              className={ errors.name ? "input-error" : "" }/>

            <SeatSelect type="min_seats" handleChange={ this.handleChange } value={ min_seats } errors={ errors }/>
            <SeatSelect type="max_seats" handleChange={ this.handleChange } value={ max_seats } errors={ errors }/>
            <DiningTimeSelect handleChange={ this.handleChange } value={ dining_time } errors={ errors }/>

            <input type="submit" value={ message } />
          </form>
        </div>
      </div>
    );
  }
}

export default TableForm;
