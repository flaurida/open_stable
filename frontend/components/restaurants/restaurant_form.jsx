import React from 'react';
import { Link, withRouter } from 'react-router';
import { AllHoursSelect } from './hours_select';
import Errors from '../errors/errors';

class RestaurantForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.restaurant;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHoursChange = this.handleHoursChange.bind(this);
  }

  componentWillMount() {
    this.redirectUnlessLoggedIn();
  }

  componentDidMount() {
    if (this.props.formType === "edit") {
      this.props.requestSingleRestaurant(this.props.params.restaurantId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.formType === "new") return;
    if (this.props.restaurant.id !== parseInt(nextProps.params.restaurantId)) {
      this.props.requestSingleRestaurant(nextProps.params.restaurantId);
    }
    if (this.props.restaurant.id !== nextProps.restaurant.id) {
      this.setState(nextProps.restaurant);
    }
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state).then(restaurant => {
      this.props.router.push(`/restaurants/${restaurant.id}`);
    });
  }

  redirectUnlessLoggedIn() {
    if (!this.props.currentUser) {
      this.props.router.push("/");
    }
  }

  usStatesSelect() {
    return window.US_STATES.map((state, i) => (
      <option value={ state } key={i}>
        { state }
      </option>
    ));
  }

  priceRangeSelect() {
    return window.PRICE_RANGES.map((price_range, i) => (
      <option value={ price_range } key={i}>
        { price_range }
      </option>
    ));
  }

  handleHoursChange(day, i) {
    return e => {
      const currentHours = Object.assign({}, this.state.hours);
      currentHours[day][i] = e.currentTarget.value;
      this.setState({ hours: currentHours });
    };
  }

  render() {
    const message = this.props.formType === "new" ? "Create Stable" : "Update Stable";
    const { name, address, city, state, zip_code, description, price_range, hours } = this.state;
    const { errors } = this.props;

    return (
      <div className="restaurant-form-page">
        <div className="form-container restaurant-form-container">
          <h1 className="form-header">{ message }</h1>

          <Errors errors={ errors } />

          <form className="restaurant-form" onSubmit={ this.handleSubmit }>
            <input type="text" value={ name } placeholder="Name *" onChange={ this.handleChange("name") }
              className={ errors.name ? "input-error" : "" }/>
            <input type="text" value={ address } placeholder="Street Address *" onChange={ this.handleChange("address") }
              className={ errors.address ? "input-error" : "" }/>
            <input type="text" value={ city } placeholder="City *" onChange={ this.handleChange("city") }
              className={ errors.city ? "input-error" : "" } />
            <select onChange={ this.handleChange("state") } value={ state }
              className={ errors.state ? "input-error" : "" } >
              <option disabled value="">Select State</option>
              { this.usStatesSelect() }
            </select>
            <input type="text" value={ zip_code } placeholder="Zip Code *" onChange={ this.handleChange("zip_code") }
              className={ errors.zip_code ? "input-error" : "" }/>
            <select onChange={ this.handleChange("price_range") } value={ price_range }
              className={ errors.price_range ? "input-error" : "" }>
              <option disabled value="">Select Price Range</option>
              { this.priceRangeSelect() }
            </select>
            <textarea value={ description } placeholder="Describe your stable..." onChange={ this.handleChange("description") }
              className={ errors.description ? "input-error form-text" : "form-text" }/>

            <label className="hours-label">Hours of Operation</label>
            <AllHoursSelect hours={ hours } handleHoursChange={ this.handleHoursChange } errors={ errors }/>

            <input type="submit" value={ message } />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(RestaurantForm);
