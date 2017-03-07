import React from 'react';
import { Link, withRouter } from 'react-router';
import Errors from '../errors/errors';
import GuestLogin from './guest_login';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logInAs = this.logInAs.bind(this);
    this.disabled = false;
  }

  componentWillMount() {
    this.props.clearSessionErrors();
  }

  componentDidMount() {
    if (this.props.demo) {
      document.getElementById("guest-login").click();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.formType !== nextProps.formType) {
      this.props.clearSessionErrors();
    }
  }

  handleChange(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  initialState() {
    if (this.props.formType === "login") {
      return {
        email: "",
        password: ""
      };
    } else {
      return {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        zip_code: ""
      };
    }
  }

  nameFields() {
    if (this.props.formType === "login") return null;
    const { first_name, last_name } = this.state;

    return (
      [
        <input key="first_name" type="text" value={ first_name } onChange={this.handleChange("first_name")} placeholder="First Name *"
          className={ this.props.errors.first_name ? "input-error" : "" }/>,
        <input key="last_name" type="text" value={ last_name } onChange={this.handleChange("last_name")} placeholder="Last Name *"
          className={ this.props.errors.last_name ? "input-error" : "" }/>
      ]
    );
  }

  passwordConfirmationAndZipFields() {
    if (this.props.formType === "login") return null;
    const { password_confirmation, zip_code } = this.state;

    return (
      [
        <input key="password" type="password" value={ password_confirmation } onChange={this.handleChange("password_confirmation")} placeholder="Re-enter password *"
          className={ this.props.errors.password_confirmation ? "input-error" : "" }/>,
        <input key="zip_code" type="text" value={ zip_code } onChange={this.handleChange("zip_code")} placeholder="Zip code *"
          className={ this.props.errors.zip_code ? "input-error" : "" }/>
      ]
    );
  }

  logInAs(email, password) {
    this.disabled = true;
    this.props.clearSessionErrors();
    this.setState({ email: "", password: "" }, () => {
      this.typeValue(email, "email", () => {
        this.typeValue(password, "password", () => {
          this.props.processForm(this.state);
        });
      });
    });
  }

  typeValue(value, field, callback) {
    if (!value) return callback();
    this.setState({ [field]: this.state[field] + value[0] });
    setTimeout(() => {
      this.typeValue(value.slice(1), field, callback);
    }, 100);
  }

  navLink() {
    if (this.props.formType === "login") {
      return (
        <p className="nav-link">Not a member?&nbsp;
          <button onClick={ () => this.props.receiveModal("signup") }>Sign up instead</button>
        </p>
      );
    } else {
      return (
        <p className="nav-link">Already a member?&nbsp;
          <button onClick={ () => this.props.receiveModal("login") }>Sign in instead</button>
        </p>
      );
    }
  }

  emailMessage() {
    return this.props.formType === "signup" ? "Enter email *" : "Email";
  }

  passwordMessage() {
    return this.props.formType === "signup" ? "Enter password *" : "Password";
  }

  submitMessage() {
    return this.props.formType === "signup" ? "Create Account" : "Sign In";
  }

  welcomeMessage() {
    return this.props.formType === "signup" ? "Welcome to OpenStable!" : "Please sign in";
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="form-container">
        <div className="form-header">
          <h1>{ this.welcomeMessage() }</h1>
          <i className="fa fa-times" aria-hidden="true" onClick={ this.props.clearModal }/>
        </div>
        <Errors errors={ this.props.errors } />
        { this.navLink() }

        <form onSubmit={this.handleSubmit} className="session-form">
          <fieldset disabled={ this.disabled } >
            { this.nameFields() }
            <input type="email" value={ email } onChange={this.handleChange("email") } placeholder={ this.emailMessage() }
              className={ this.props.errors.email ? "input-error" : "" } />
            <input type="password" value={ password } onChange={this.handleChange("password") } placeholder={ this.passwordMessage() }
              className={ this.props.errors.password ? "input-error" : "" } />
            { this.passwordConfirmationAndZipFields() }
            <input type="submit" value={ this.submitMessage() } />
            <GuestLogin formType={ this.props.formType } logInAs={ this.logInAs } />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default SessionForm;
