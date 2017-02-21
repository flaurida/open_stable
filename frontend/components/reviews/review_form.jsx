import React from 'react';
import { Link, withRouter } from 'react-router';
import { ReviewStarsInput, NoiseLevelInput } from './reviews_helper';
import Errors from '../errors/errors';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.review;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      this.setState({ [field]: e.target.value });
    };
  }

  toggleCheckbox(e) {
    this.setState({ recommended: !this.state.recommended });
  }

  render() {
    const message = this.props.formType === "new" ? "Create Review" : "Update Review";
    const { overall_rating, food_rating, ambience_rating,
      service_rating, value_rating, noise_rating, recommended, body } = this.state;

    return (
      <div className="form-container">
        <div className="form-header">
          <h1>{ message }</h1>
          <i className="fa fa-times" aria-hidden="true" onClick={ this.props.clearModal }/>
        </div>
        <Errors errors={ this.props.errors } />

        <form onSubmit={this.handleSubmit} className="review-form">

          <div className="review-form-select">
            <p>Overall Rating:&nbsp;&nbsp;</p><ReviewStarsInput numStars={ overall_rating }
              handleChange={ this.handleChange } field="overall_rating"/>
          </div>

          <div className="review-form-select">
            <p>Food Rating:&nbsp;&nbsp;</p><ReviewStarsInput numStars={ food_rating }
              handleChange={ this.handleChange } field="food_rating"/>
          </div>

          <div className="review-form-select">
            <p>Ambience Rating:&nbsp;&nbsp;</p><ReviewStarsInput numStars={ ambience_rating }
              handleChange={ this.handleChange } field="ambience_rating"/>
          </div>

          <div className="review-form-select">
            <p>Service Rating:&nbsp;&nbsp;</p><ReviewStarsInput numStars={ service_rating }
              handleChange={ this.handleChange } field="service_rating"/>
          </div>

          <div className="review-form-select">
            <p>Value Rating:&nbsp;&nbsp;</p><ReviewStarsInput numStars={ value_rating }
              handleChange={ this.handleChange } field="value_rating"/>
          </div>

          <div className="review-form-select">
            <p>Noise:&nbsp;&nbsp;</p><NoiseLevelInput noiseLevel={ noise_rating }
              handleChange={ this.handleChange } />
          </div>

          <div className="review-checkbox">
            <input type="checkbox" onChange={ this.toggleCheckbox } checked={ recommended }/>
            <label htmlFor="recommend-checkbox">I would recommend to another Khaleesi</label>
          </div>

          <textarea value={ body } onChange={ this.handleChange("body") }
            placeholder="Write your review here..." className="review-text"/>
          <input type="submit" value={ message } />
        </form>
      </div>
    );
  }
}

export default ReviewForm;
