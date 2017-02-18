import React from 'react';
import { Link } from 'react-router';
import { NumGuestsSelect } from './restaurant_helper';
import { SingleHoursSelect } from './hours_select';

class RestaurantSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num_seats: "2",
      date: new Date(),
      time: "7:00 pm"
    };

    this.today = this.today();
    console.log(this.today);
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    const { num_seats, date, time } = this.state;

    return (
      <div>
        <form>
          <NumGuestsSelect handleChange={ this.handleChange("num_seats") } value={ num_seats } />
          <input type="date" min={ this.today } onChange={ this.handleChange("date") } value={ date } />
          <SingleHoursSelect onChange={ this.handleChange("time") } value={ time } />
          <input type="text" placeholder="Restaurant Name" />
          <Link to="/search">Find a Stable</Link>
        </form>
      </div>
    );
  }
}

export default RestaurantSearch;
