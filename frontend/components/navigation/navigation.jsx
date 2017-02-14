import React from 'react';
import { Link } from 'react-router';

const sessionLinks = () => (
  <div className="signup-signin">
    <Link to="/signup" id="signup">Sign up</Link>
    <Link to="/signin" id="signin">Sign in</Link>
  </div>
);

const personalGreeting = (currentUser, logout) => (
  <div className="personal-greeting">
    <Link to="#">Hi, { currentUser.first_name }</Link>
    <button onClick={ logout }>Sign out</button>
  </div>
);

const Navigation = ({ currentUser, logout }) => {
  const navLinks = currentUser ? personalGreeting(currentUser, logout) : sessionLinks();

  return (
    <nav className="main-nav">
      <Link className="logo" to="/">
        <img src={ window.images.openStableLogo } className="logo-img" alt="Excited horse!"/>
        <h1>OpenStable</h1>
      </Link>

      { navLinks }
    </nav>
  );
};

export default Navigation;
