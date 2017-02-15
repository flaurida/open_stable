import React from 'react';
import NavLinksContainer from './nav_links_container';

class HamburgerNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hidden: true };
    this.toggleHidden = this.toggleHidden.bind(this);
  }

  toggleHidden() {
    this.setState({ hidden: !this.state.hidden });
  }

  navLinks() {
    if (!this.state.hidden) {
      return <NavLinksContainer className="hamburger-links" toggleHidden={ this.toggleHidden } />;
    }
  }

  render() {
    return (
      <nav className="hamburger-nav">
        <button onClick={ this.toggleHidden }>
          <i className="fa fa-bars icon" aria-hidden="true" />
        </button>
        { this.navLinks() }
      </nav>
    );
  }
}

export default HamburgerNav;
