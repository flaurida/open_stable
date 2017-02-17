import React from 'react';
import Navigation from '../navigation/navigation';
import ModalContainer from '../modal/modal_container';

const App = ({ modal, modalType, children }) => (
  <div>
    <ModalContainer modal={ modal } modalType={ modalType }/>
    <Navigation />
    { children }
  </div>
);

export default App;
