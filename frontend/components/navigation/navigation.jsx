import React from 'react';
import { Link } from 'react-router';
import HamburgerNav from './hamburger_nav';
import NavLinksContainer from './nav_links_container';

class Navigation extends React.Component {
  render() {
    return (
      <nav className="main-nav">
        <Link className="logo" to="/">
          <img src={ window.images.openStableLogo } className="logo-img" alt="Excited horse!"/>
          <h1>OpenStable</h1>
        </Link>
        <NavLinksContainer className="nav-links"/>
        <HamburgerNav />
      </nav>
    );
  }
}

export default Navigation;
