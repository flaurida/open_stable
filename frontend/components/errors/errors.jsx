import React from 'react';
import { capitalize } from '../restaurants/hours_select';

class Errors extends React.Component {
  errorList() {
    const { errors } = this.props;

    return Object.keys(errors).map((error, i) => {
      if (error === "hours") return this.hourErrors();

      let formatted_error = error.split("_").join(" ");
      formatted_error = formatted_error[0].toUpperCase() + formatted_error.slice(1);

      return (
        <li className="flash-error" key={i}>
          { formatted_error + " " + errors[error].join(", ") }
        </li>
      );
    });
  }

  hourErrors() {
    const { errors } = this.props;

    if (errors["hours"].length === 0) return null;

    return Object.keys(errors["hours"][0]).map((day, i) => {
      return (
        <li className="flash-error" key={i}>
          { `Closing time must be after opening on ${capitalize(day)}` }
        </li>
      );
    });
  }

  render() {
    if (this.props.errors.length === 0) return null;

    return (
      <div className="flash-container">
        <ul>
          { this.errorList() }
        </ul>
      </div>
    );
  }
}

export default Errors;
