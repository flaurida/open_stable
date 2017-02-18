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
    this.updateFile = this.updateFile.bind(this);
  }

  componentWillMount() {
    this.redirectUnlessLoggedIn();
    this.props.clearRestaurantErrors();
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

  mapStateToFormData(formData) {
    Object.keys(this.state).forEach((key) => {
      formData.append(`restaurant[${key}]`, this.state.key);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    if (this.state.imageFile) {
      formData.append("restaurant[image]", this.state.imageFile);
    }

    formData.append("restaurant[name]", this.state.name);
    formData.append("restaurant[address]", this.state.address);
    formData.append("restaurant[city]", this.state.city);
    formData.append("restaurant[state]", this.state.state);
    formData.append("restaurant[zip_code]", this.state.zip_code);
    formData.append("restaurant[hours]", JSON.stringify(this.state.hours));
    formData.append("restaurant[description]", this.state.description);
    formData.append("restaurant[price_range]", this.state.price_range);

    if (this.props.params.restaurantId) {
      formData.append("restaurant[id]", this.props.params.restaurantId);
    }

    this.props.processForm(formData).then(restaurant => {
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

  handleHoursChange(day, i, closed=false) {
    return e => {
      const currentHours = Object.assign({}, this.state.hours);
      if (closed) {
        currentHours[day] = [];
      } else if (currentHours[day].length === 0) {
        currentHours[day] = ["12:00 pm", "10:00 pm"];
      } else if (i === null) {
        currentHours[day] = currentHours[day].concat(["12:00 pm", "10:00 pm"]);
      } else {
        currentHours[day][i] = e.currentTarget.value;
      }
      this.setState({ hours: currentHours });
    };
  }

  updateFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({ imageFile: file, imageUrl: fileReader.result });
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
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

            <label htmlFor="restaurant-img" className="img-upload">Upload Image</label>
            <input id="restaurant-img" type="file" onChange={this.updateFile} className="hidden" />
            <img src={this.state.imageUrl} />

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
