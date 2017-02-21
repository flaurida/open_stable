import React from 'react';
import { Link } from 'react-router';

class UserProfile extends React.Component {
  render() {
    return (
      <div className="user-profile-container">
        <nav className="user-nav">
          <ul>
            <li><Link to={{ pathname: "/profile/restaurants", query: { restaurants: "mine" }}}>My Stables</Link></li>
          </ul>
        </nav>
        { this.props.children }
      </div>
    );
  }
}

export default UserProfile;
