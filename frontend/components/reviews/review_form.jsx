import React from 'react';
import { Link, withRouter } from 'react-router';
import { ReviewStarsInput } from './reviews_helper';
import Errors from '../errors/errors';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.review;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetField = this.resetField.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }

  componentWillMount() {
    this.props.clearReviewErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    const review = Object.assign({}, this.state);
    this.props.processForm(this.props.restaurantId, review);
  }

  handleChange(field) {
    return e => {
      debugger
      this.setState({ [field]: e.target.value });
    };
  }

  toggleCheckbox(e) {
    debugger
    this.setState({ recommended: !this.state.recommended });
  }

  resetField(field) {
    return e => {
      this.setState({ [field]: null });
    };
  }

  render() {
    const message = this.props.formType === "new" ? "Create Review" : "Update Review";
    const { overall_rating, food_rating, ambience_rating, recommended, body } = this.state;

    return (
      <div className="form-container">
        <div className="form-header">
          <h1>{ message }</h1>
          <i className="fa fa-times" aria-hidden="true" onClick={ this.props.clearModal }/>
        </div>
        <Errors errors={ this.props.errors } />

        <form onSubmit={this.handleSubmit} className="review-form">

          <div className="review-form-select">
            <p>Food Rating:&nbsp;&nbsp;</p><ReviewStarsInput numStars={ food_rating }
              handleChange={ this.handleChange } resetField={ this.resetField } field="food_rating"/>
          </div>

          <div className="review-form-select">
            <p>Ambience Rating:&nbsp;&nbsp;</p><ReviewStarsInput numStars={ ambience_rating }
              handleChange={ this.handleChange } resetField={ this.resetField } field="ambience_rating"/>
          </div>

          <input type="checkbox" id="recommend-checkbox" onChange={ this.toggleCheckbox } checked={ recommended }/>
          <label htmlFor="recomment-checkbox">Recommend to another Khaleesi</label>
          <textarea value={ body } onChange={ this.handleChange("body") } placeholder="Write your review here..." />
          <input type="submit" value={ message } />
        </form>
      </div>
    );
  }
}

export default ReviewForm;
