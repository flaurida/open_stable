import React from 'react';
import { Link } from 'react-router';

const NavLinks = props => {
  const receiveModal = (modalType) => {
    props.receiveModal(modalType);
    props.toggleHidden();
  }

  if (props.currentUser) {
    return (
      <div className={ props.className }>
        <Link to="#">Hi, { props.currentUser.first_name }</Link>
        <button onClick={ () => props.logout().then(props.toggleHidden) } className="session">
          Sign out
        </button>
      </div>
    );
  } else {
    return (
      <div className={ props.className }>
        <button onClick={ () => receiveModal("signup") } className="session">
          Sign up
        </button>
        <button onClick={ () => receiveModal("login") } id="signin">
          Sign in
        </button>
      </div>
    );
  }
}

export default NavLinks;
