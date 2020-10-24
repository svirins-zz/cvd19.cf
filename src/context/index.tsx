import React, { useState } from "react";
import { ContextProps, AuxProps } from "../@types";

export const myContext = React.createContext<Partial<ContextProps>>({});

const Provider = ({ children }: AuxProps) => {
  const [choice, setChoice] = useState("");
  const [visible, setVisible] = useState(false);
  return (
    <myContext.Provider
      value={{
        choice,
        visible,
        handleSelect: ({ key }: { key: string }) => {
          setChoice(key);
        },
        onClose: () => setVisible(false),
        showDrawer: () => setVisible(true),
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default ({ element }: { element: React.ReactChildren }) => (
  <Provider>{element}</Provider>
);
