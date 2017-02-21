import React from 'react';
import { Link, withRouter } from 'react-router';
import HamburgerNav from './hamburger_nav';
import NavLinksContainer from './nav_links_container';
import { CitySelect } from '../splash/splash_helper';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.handleCityLinkChange = this.handleCityLinkChange.bind(this);
  }

  handleCityLinkChange(e) {
    this.props.router.push({ pathname: "/restaurants", query: { city: e.currentTarget.value }});
  }

  render() {
    return (
      <nav className="main-nav">
        <div className="logo">
          <Link className="logo-link" to="/">
            <img src={ window.images.openStableLogo } className="logo-img" alt="Excited horse!"/>
            <h1>OpenStable</h1>
          </Link>
          <CitySelect handleChange={ this.handleCityLinkChange } value={ this.props.location.query.city }/>
        </div>
        <NavLinksContainer className="nav-links"/>
        <HamburgerNav />
      </nav>
    );
  }
}

export default withRouter(Navigation);
