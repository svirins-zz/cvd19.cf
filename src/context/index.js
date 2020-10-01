/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

export const myContext = React.createContext();

// eslint-disable-next-line react/prop-types
const Provider = ({ children }) => {
  const [choice, setChoice] = useState('main');
  const handleClick = (e) => {
    setChoice(e.key);
  };
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <myContext.Provider value={{
      choice,
      handleClick: (e) => setChoice(e.key),
    }}
    >
      {children}
    </myContext.Provider>
  );
};

export default ({ element }) => (
  <Provider>
    {element}
  </Provider>
);
