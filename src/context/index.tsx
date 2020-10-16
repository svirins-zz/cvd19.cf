import React, { useState, ChangeEvent } from 'react';
import { ContextProps, AuxProps } from 'types';

export const myContext = React.createContext<Partial<ContextProps>>({});

const Provider = ({ children }: AuxProps) => {
  const [choice, setChoice] = useState('');
  const [visible, setVisible] = useState(false);
  return (
    <myContext.Provider value={{
      choice,
      handleSelect: (e: ChangeEvent) => {
        setChoice(e.key);
      },
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
