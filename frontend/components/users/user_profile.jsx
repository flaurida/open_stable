import React from 'react';
import { Link } from 'react-router';

class UserProfile extends React.Component {
  render() {
    return (
      <div className="user-profile-container">
        <nav className="user-nav">
          <ul>
            <li><Link to={{ pathname: "/profile/restaurants", query: { restaurants: "favorites" }}}>Favorites</Link></li>
            <li><Link to={{ pathname: "/profile/restaurants", query: { restaurants: "mine" }}}>Stables</Link></li>
            <li><Link to={{ pathname: "/profile/reviews", query: { reviews: "mine" }}}>Reviews</Link></li>
          </ul>
        </nav>
        { this.props.children }
      </div>
    );
  }
}

export default UserProfile;
