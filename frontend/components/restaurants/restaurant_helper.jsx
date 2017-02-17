import React from 'react';

const dollarSign = key => <p className="dollar-sign" key={ key }>$</p>;
const noDollarSign = key => <p className="no-dollar-sign" key={ key }>$</p>;

export const RestaurantDollarSigns = ({ numDollarSigns }) => {
  const dollarSigns = [];
  const noDollarSigns = [];

  for (let i = 0; i < numDollarSigns; i++) {
    dollarSigns.push(dollarSign(i));
  }

  for (let i = 0; i < 4 - numDollarSigns; i++) {
    noDollarSigns.push(noDollarSign(i));
  }

  return (
    <div className="dollar-signs">
      { dollarSigns }
      { noDollarSigns }
    </div>
  );
};

export const currentUserIsOwner = (currentUser, restaurant) => {
  return currentUser && currentUser.id === restaurant.owner_id;
};
