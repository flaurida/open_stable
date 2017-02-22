import React from 'react';
import { Link, withRouter } from 'react-router';
import { NumGuestsSelect } from './restaurant_helper';
import { SingleHoursSelect } from './hours_select';
import RestaurantDetailSearch from './restaurant_detail_search';
import RestaurantQuery from './restaurant_query';

class RestaurantSearch extends React.Component {
  constructor(props) {
    super(props);
    this.today = this.today();
    this.state = this.initialState();

    this.handleChange = this.handleChange.bind(this);
    this.handleQueryString = this.handleQueryString.bind(this);
    this.setQueryData = this.setQueryData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.query !== nextProps.location.query) {
      this.props.searchRestaurants(nextProps.location.query);
      this.props.clearSearchErrors();
    }
  }

  initialState() {
    const defaultState = {
      num_seats: "2",
      date: this.today,
      time: "7:00 pm",
      query: "",
      queryData: null,
      restaurant_id: this.props.params.restaurantId,
    };

    return Object.assign(defaultState, this.props.location.query);
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

  handleQueryString(e) {
    this.setState({ query: e.currentTarget.value }, () => {
      if (this.state.query === "") {
        this.setState({ queryData: null });
        this.props.clearQueryData();
      } else {
        this.props.queryRestaurants(this.state);
      }
    });
  }

  setQueryData(queryData) {
    return e => {
      this.setState({ queryData, query: queryData.name }, () => {
      });
    };
  }

  restaurantQuery() {
    if (!this.state.queryData) {
      return <RestaurantQuery setQueryData={ this.setQueryData }/>;
    }

    return null;
  }

  searchBar() {
    if (this.props.searchType === "single") {
      return null;
    }

    const { num_seats, date, time } = this.state;

    return (
      <div className="query-container">
        <input type="text" onChange={ this.handleQueryString } value={ this.state.query } placeholder="Restaurant Name" />
        { this.restaurantQuery() }
      </div>
    );
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

  searchLink() {
    if (!this.state.queryData) {
      return (
        <Link to={{ pathname: this.props.location.pathname, query: this.state }}>
          Find a Stable
        </Link>
      );
    } else if (this.state.queryData.type === "restaurant") {
      return (
        <Link to={{ pathname: `/restaurants/${this.state.queryData.id}`, query: this.state }}>
          Find a Stable
        </Link>
      );
    } else {
      return (
        <Link to={{ pathname: "/restaurants", query: { city: this.state.queryData.name }}}>
          Find a Stable
        </Link>
      );
    }
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
          { this.searchLink() }
        </form>

        { this.individualSearchData() }
      </section>
    );
  }
}

export default withRouter(RestaurantSearch);
