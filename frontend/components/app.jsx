import React from 'react';
import NavigationContainer from './navigation/navigation_container';

const App = ({ children }) => (
  <div>
    <NavigationContainer />
    { children }
  </div>
);

export default App;
