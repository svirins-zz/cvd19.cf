import React from "react";
import { useImmer } from "use-immer";
import { ContextProps, AuxProps } from "../@types";

export const myContext = React.createContext<Partial<ContextProps>>({});

const Provider = ({ children }: AuxProps) => {
  const [choice, setChoice] = useImmer({
    key: "",
  });
  const [visible, setVisible] = useImmer({
    isVisible: false,
  });
  return (
    <myContext.Provider
      value={{
        choice,
        visible,
        handleSelect: (key) => {
          setChoice((draft) => {
            draft.key = key;
          });
        },
        onClose: () =>
          setVisible((draft) => {
            draft.isVisible = false;
          }),
        showDrawer: () =>
          setVisible((draft) => {
            draft.isVisible = true;
          }),
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default ({ element }: { element: React.ReactChildren }) => (
  <Provider>{element}</Provider>
);
