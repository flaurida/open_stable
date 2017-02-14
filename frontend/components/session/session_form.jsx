import React from 'react';
import { Link, withRouter } from 'react-router';

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

  componentDidUpdate() {
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
      <div>
        <input type="text" value={ first_name } onChange={this.handleChange("first_name")} placeholder="First Name *"/>
        <input type="text" value={ last_name } onChange={this.handleChange("last_name")} placeholder="Last Name *"/>
      </div>
    );
  }

  passwordConfirmationAndZipFields() {
    if (this.props.formType === "login") return null;
    const { password_confirmation, zip_code } = this.state;

    return (
      <div>
        <input type="password" value={ password_confirmation } onChange={this.handleChange("password_confirmation")} placeholder="Re-enter password *"/>
        <input type="text" value={ zip_code } onChange={this.handleChange("zip_code")} placeholder="Zip code *"/>
      </div>
    );
  }

  navLink() {
    if (this.props.formType === "login") {
      return <Link to="/signup">sign up instead</Link>;
    } else {
      return <Link to="/signin">sign in instead</Link>;
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
        { this.navLink() }
        <form onSubmit={this.handleSubmit} className="session-form">
          { this.nameFields() }
          <input type="email" value={ email } onChange={this.handleChange("email") } placeholder={ this.emailMessage() } />
          <input type="password" value={ password } onChange={this.handleChange("password") } placeholder={ this.passwordMessage() } />
          { this.passwordConfirmationAndZipFields() }
          <input type="submit" value={ this.submitMessage() } />
        </form>
      </div>
    );
  }
}

export default SessionForm;
