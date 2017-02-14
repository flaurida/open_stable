import React from 'react';
import { Link, withRouter } from 'react-router';
import Errors from '../errors/errors';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  redirectIfLoggedIn() {
    if (this.props.loggedIn) this.redirect();
  }

  redirect() {
    this.props.router.push("/");
  }

  componentWillMount() {
    this.props.clearSessionErrors();
    this.redirectIfLoggedIn();
  }

  handleChange(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(() => this.redirect());
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
        <input key="first_name" type="text" value={ first_name } onChange={this.handleChange("first_name")} placeholder="First Name *" className={ this.props.errors.first_name ? "input-error" : "" }/>,
        <input key="last_name" type="text" value={ last_name } onChange={this.handleChange("last_name")} placeholder="Last Name *" className={ this.props.errors.last_name ? "input-error" : "" }/>
      ]
    );
  }

  passwordConfirmationAndZipFields() {
    if (this.props.formType === "login") return null;
    const { password_confirmation, zip_code } = this.state;

    return (
      [
        <input key="password" type="password" value={ password_confirmation } onChange={this.handleChange("password_confirmation")} placeholder="Re-enter password *" className={ this.props.errors.password_confirmation ? "input-error" : "" }/>,
        <input key="zip_code" type="text" value={ zip_code } onChange={this.handleChange("zip_code")} placeholder="Zip code *" className={ this.props.errors.zip_code ? "input-error" : "" }/>
      ]
    );
  }

  navLink() {
    if (this.props.formType === "login") {
      return <p className="nav-link">Not a member? <Link to="/signup">Sign up instead</Link></p>;
    } else {
      return <p className="nav-link">Already a member? <Link to="/signin">Sign in instead</Link></p>;
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
      <div className="session-form-container">
        <h1 className="session-form-header">{ this.welcomeMessage() }</h1>
        <Errors errors={ this.props.errors } />
        { this.navLink() }
        <form onSubmit={this.handleSubmit} className="session-form">
          { this.nameFields() }
          <input type="email" value={ email } onChange={this.handleChange("email") } placeholder={ this.emailMessage() } className={ this.props.errors.email ? "input-error" : "" } />
          <input type="password" value={ password } onChange={this.handleChange("password") } placeholder={ this.passwordMessage() } className={ this.props.errors.password ? "input-error" : "" } />
          { this.passwordConfirmationAndZipFields() }
          <input type="submit" value={ this.submitMessage() } />
        </form>
      </div>
    );
  }
}

export default SessionForm;
