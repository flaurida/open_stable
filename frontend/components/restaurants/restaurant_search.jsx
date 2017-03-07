import React from 'react';
import { Link, withRouter } from 'react-router';
import { NumGuestsSelect } from './restaurant_helper';
import { SingleHoursSelect } from './hours_select';
import RestaurantDetailSearch from './restaurant_detail_search';
import RestaurantQuery from './restaurant_query';
import Errors from '../errors/errors';

class RestaurantSearch extends React.Component {
  constructor(props) {
    super(props);
    this.today = this.today();
    this.state = this.initialState();

    this.handleChange = this.handleChange.bind(this);
    this.handleQueryString = this.handleQueryString.bind(this);
    this.setQueryData = this.setQueryData.bind(this);
    this.setFetching = this.setFetching.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.query === "" && (this.props.queryData.restaurants.length !== 0 || this.props.queryData.cities.length !== 0)) {
      this.props.clearSearchErrors();
      this.props.clearQueryData();
    } else if (nextProps.location.query.type === "search" && JSON.stringify(this.props.location.query) !== JSON.stringify(nextProps.location.query)) {
      this.props.searchRestaurants(nextProps.location.query).then(() => this.setState({ fetching: false }));
      this.props.clearSearchErrors();
    } else if (nextProps.location.query.city !== this.state.city) {
      this.setState({ city: nextProps.location.query.city });
    }
  }

  componentWillMount() {
    if (this.props.location.query.type === "search" && Object.keys(this.props.location.query).length !== 0) {
      this.props.searchRestaurants(this.props.location.query).then(() => this.setState({ fetching: false }));
    }
  }

  componentWillUnmount() {
    this.props.clearSearchErrors();
    this.props.clearQueryData();
  }

  initialState() {
    const defaultState = {
      num_seats: "2",
      date: this.today,
      time: "7:00 pm",
      query: "",
      queryData: null,
      city: "",
      restaurant_id: this.props.params.restaurantId,
      fetching: false
    };

    return Object.assign(defaultState, this.props.location.query);
  }

  setFetching(e) {
    this.setState({ fetching: true });
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
        this.props.receiveDropdown("bookingQuery");
        this.props.queryRestaurants(this.state);
      }
    });
  }

  setQueryData(queryData) {
    return e => {
      if (queryData.type === "city") {
        this.setState({ city: queryData.name, queryData, query: queryData.name });
      } else {
        this.setState({ queryData, query: queryData.name, restaurant_id: queryData.id, city: "" });
      }

      this.props.clearDropdown();
    };
  }

  restaurantQuery() {
    if (this.state.query !== "") {
      return <RestaurantQuery setQueryData={ this.setQueryData } />;
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
        <input type="text" onChange={ this.handleQueryString } value={ this.state.query } placeholder="Stable or City" />
        { this.restaurantQuery() }
      </div>
    );
  }

  individualSearchData() {
    if (this.state.fetching) {
      return <div className="loader">Loading...</div>;
    }

    if (this.props.searchType === "single") {
      return <RestaurantDetailSearch searchData={ this.props.searchData }
        restaurantId={ this.props.params.restaurantId }
        createBooking= { this.props.createBooking }
        clearSearchErrors={ this.props.clearSearchErrors }
        errors={ this.props.errors }/>;
    }

    return <Errors errors={ this.props.errors } />;
  }

  searchLink() {
    const { num_seats, date, time } = this.state;

    if (this.state.city) {
      return (
        <Link to={{ pathname: "/restaurants", query: { type: "search", num_seats, date, time, city: this.state.city }}} onClick={ this.setFetching }>
          Find a Stable
        </Link>
      );
    } else if (!this.state.queryData) {
      const restaurant_id = this.props.params.restaurantId;

      return (
        <Link to={{ pathname: this.props.location.pathname, query: { num_seats, date, time, restaurant_id, type: "search" } }} onClick={ this.setFetching }>
          Find a Stable
        </Link>
      );
    } else {
      const restaurant_id = this.state.restaurant_id;
      return (
        <Link to={{ pathname: `/restaurants/${this.state.restaurant_id}`, query: { num_seats, date, time, restaurant_id, type: "search" }}} onClick={ this.setFetching }>
          Find a Stable
        </Link>
      );
    }
  }

  render() {
    const { num_seats, date, time } = this.state;
    const { splash } = this.props;
    const className = splash ? "search-form-container search-form-splash" : "search-form-container";

    return (
      <section className={ className } id="reservation">
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
