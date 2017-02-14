import React from 'react';

class Errors extends React.Component {
  errorList() {
    return this.props.errors.map((error, i) => (
      <li className="flash flash-error" key={i}>
        { error }
      </li>
    ));
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
