import React from 'react';

class RestaurantDetailSearch extends React.Component {
  render() {
    const { searchData } = this.props;

    if (!searchData.name) {
      return (
        <div className="no-results-notice">
          We're sorry, this stable is completely booked at that time!
        </div>
      );
    }
    debugger

    return <h1>here</h1>;
  }
}

export default RestaurantDetailSearch;
