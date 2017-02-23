import React from 'react';
import Navigation from '../navigation/navigation';
import ModalContainer from '../modal/modal_container';
import NoticesContainer from '../notices/notices_container';

const App = ({ modal, modalType, children, dropdown, clearDropdown }) => {
  const handleClick = e => {
    if (dropdown) {
      clearDropdown();
    }
  };

  return (
    <div onClick={ handleClick }>
      <ModalContainer modal={ modal } modalType={ modalType }/>
      <Navigation />
      <NoticesContainer />
      { children }
    </div>
  );
}

export default App;
