import React from 'react';
import Navigation from '../navigation/navigation';
import ModalContainer from '../modal/modal_container';


const App = ({ modal, children }) => (
  <div>
    <ModalContainer modal={ modal } />
    <Navigation />
    { children }
  </div>
);

export default App;
