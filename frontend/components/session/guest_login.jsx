import React from 'react';

const GuestLogin = ({ formType, logInAs }) => {
  if (formType === "signup") return null;

  return (
    <button type="button" className="guest-button" id="guest-login" onClick={ () => logInAs("iluvdrogo@dany.com", "dragon") }>
      Sign In as Daenerys
    </button>
  );
};

export default GuestLogin;
