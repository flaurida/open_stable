import React from 'react';
import { Link, withRouter } from 'react-router';

class RestaurantForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.restaurant;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.redirectUnlessLoggedIn();
  }

  componentDidMount() {
    debugger
    if (this.props.formType === "edit") {
      this.props.requestSingleRestaurant(this.props.params.restaurantId);
    }
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state).then(restaurant => {
      this.props.routher.push(`/restaurants/${restaurant.id}`);
    });
  }

  redirectUnlessLoggedIn() {
    if (!this.props.currentUser) {
      this.props.router.push("/");
    }
  }

  usStatesSelect() {
    return window.US_STATES.map((state, i) => (
      <option value={ state } key={i}>{ state }</option>
    ));
  }

  render() {
    const message = this.props.formType === "new" ? "Create Stable" : "Update Stable";
    const { name, address, city, state, zip_code, description } = this.state;

    return (
      <div className="restaurant-form-page">
        <div className="form-container">
          <h1 className="form-header">{ message }</h1>

          <form className="restaurant-form">
            <input type="text" value={ name } placeholder="Name *" onChange={ this.handleChange("name") } />
            <input type="text" value={ address } placeholder="Street Address *" onChange={ this.handleChange("address") }/ >
            <input type="text" value={ city } placeholder="City *" onChange={ this.handleChange("city") } />
            <select onChange={ this.handleChange("state") }>
              { this.usStatesSelect() }
            </select>
            <input type="text" value={ city } placeholder="Zip Code *" onChange={ this.handleChange("zip_code") } />
            <textarea value={ description } placeholder="Describe your stable..." onChange={ this.handleChange("description") } />
            <input type="submit" value={ message } />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(RestaurantForm);
