import React from 'react';
import { Link, withRouter } from 'react-router';
import { NumGuestsSelect } from './restaurant_helper';
import { SingleHoursSelect } from './hours_select';
import RestaurantDetailSearch from './restaurant_detail_search';

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
    if (this.props.location.query !== nextProps.location.query) {
      this.props.searchRestaurants(nextProps.location.query);
      this.props.clearSearchErrors();
    }
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

  individualSearchData() {
    if (this.props.searchType === "single") {
      return <RestaurantDetailSearch searchData={ this.props.searchData }
        restaurantId={ this.props.params.restaurantId }
        createBooking= { this.props.createBooking }
        clearSearchErrors={ this.props.clearSearchErrors }
        errors={ this.props.errors }/>;
    }

    return null;
  }

  render() {
    const { num_seats, date, time } = this.state;

    return (
      <section className="search-form-container">
        <h2>{ this.props.title }</h2>
        <form className="search-form">
          <NumGuestsSelect handleChange={ this.handleChange("num_seats") } value={ num_seats } />
          <input type="date" min={ this.today } onChange={ this.handleChange("date") } value={ date } />
          <SingleHoursSelect handleChange={ this.handleChange("time") } value={ time } />
          { this.searchBar() }
          <Link to={{ pathname: `${this.props.location.pathname}`, query: this.state }}>
            Find a Stable
          </Link>
        </form>

        { this.individualSearchData() }
      </section>
    );
  }
}

export default withRouter(RestaurantSearch);
