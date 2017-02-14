import React from 'react';

class Errors extends React.Component {
  errorList() {
    const { errors } = this.props;

    return Object.keys(errors).map((error, i) => {
      let formatted_error = error.split("_").join(" ");
      formatted_error = formatted_error[0].toUpperCase() + formatted_error.slice(1);

      return (
        <li className="flash-error" key={i}>
          { formatted_error + " " + errors[error] }
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
