/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

export const myContext = React.createContext();

// eslint-disable-next-line react/prop-types
const Provider = ({ children }) => {
  const [choice, setChoice] = useState('main');
  const [visible, setVisible] = useState(false);
  const handleClick = (e) => {
    setChoice(e.key);
  };
  const onClose = () => {
    setVisible(false);
  };
  const showDrawer = () => {
    setVisible(true);
  };
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <myContext.Provider value={{
      choice,
      handleClick: (e) => setChoice(e.key),
      visible,
      onClose: () => setVisible(false),
      showDrawer: () => setVisible(true),
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
