import React from 'react';
import { Link } from 'react-router';

const sessionLinks = () => (
  <div className="signup-signin">
    <Link to="/signup">Sign up</Link>
    <Link to="/signin">Sign in</Link>
  </div>
);

const personalGreeting = (currentUser, logout) => (
  <div className="personal-greeting">
    <Link to="#">Hi, { currentUser.first_name }</Link>
    <button onClick={ logout }>Sign out</button>
  </div>
);

const Navigation = ({ currentUser, logout }) => (
  currentUser ? personalGreeting(currentUser, logout) : sessionLinks()
);

export default Navigation;
