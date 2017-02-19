import React from 'react';
import { Link, withRouter } from 'react-router';
import { NumGuestsSelect } from './restaurant_helper';
import { SingleHoursSelect } from './hours_select';

class RestaurantSearch extends React.Component {
  constructor(props) {
    super(props);
    this.today = this.today();

    this.state = {
      num_seats: "2",
      date: this.today,
      time: "7:00 pm",
      query: "",
      restaurant_id: this.props.params.restaurantId
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.props.requestAllRestaurants(nextProps.location.query);
  }

  today() {
    const today = new Date();
    return `${today.getFullYear()}-${('0' + (today.getMonth()+1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`;
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  searchBar() {
    if (this.props.searchType === "single") {
      return null;
    }

    return <input type="text" onChange={ this.handleChange("query") } value={ this.state.query } placeholder="Restaurant Name" />;
  }

  render() {
    const { num_seats, date, time } = this.state;

    return (
      <div>
        <form>
          <NumGuestsSelect handleChange={ this.handleChange("num_seats") } value={ num_seats } />
          <input type="date" min={ this.today } onChange={ this.handleChange("date") } value={ date } />
          <SingleHoursSelect handleChange={ this.handleChange("time") } value={ time } />
          { this.searchBar() }
          <Link to={{ pathname: `${this.props.location.pathname}`, query: this.state }}>Find a Stable</Link>
        </form>
      </div>
    );
  }
}

export default withRouter(RestaurantSearch);
