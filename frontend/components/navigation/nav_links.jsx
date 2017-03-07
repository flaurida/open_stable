import React from 'react';
import { Link, withRouter } from 'react-router';

class NavLinks extends React.Component {
  receiveModal(modalType, props) {
    this.props.receiveModal(modalType, props);
    if (this.props.toggleHidden) this.props.toggleHidden();
  }

  logout() {
    if (this.props.toggleHidden) {
      return () => this.props.logout().then(() => {
        this.props.toggleHidden();
        this.redirectToHome();
      });
    } else {
      return () => this.props.logout().then(() => {
        this.redirectToHome();
      });
    }
  }

  redirectToHome() {
    this.props.router.push("/");
  }

  demoLogIn() {
    this.receiveModal("login", { demo: true });
  }

  render() {
    if (this.props.currentUser) {
      return (
        <div className={ this.props.className }>
          <Link to="/profile" className="greeting">Hi, { this.props.currentUser.first_name }</Link>
          <button onClick={ this.logout() } className="session">
            Sign out
          </button>
        </div>
      );
    } else {
      return (
        <div className={ this.props.className }>
          <button onClick={ () => this.receiveModal("signup") } className="session">
            Sign up
          </button>
          <button onClick={ () => this.receiveModal("login") } id="signin">
            Sign in
          </button>
          <button onClick={ this.demoLogIn.bind(this) } id="guest">
            Demo
          </button>
        </div>
      );
    }
  }
}

export default withRouter(NavLinks);
