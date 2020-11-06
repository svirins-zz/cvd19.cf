import React, { useEffect } from "react";
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
  const [width, setWidth] = useImmer({
    multiplyer: 1,
  });
  // calculate multiplyer, based on global window width
  const isBrowser = typeof window !== "undefined";
  useEffect(() => {
    if (!isBrowser) return false;

    const handleResize = () => {
      const windowWidth = isBrowser ? window.innerWidth : 0;
      let multiplyer = 1;
      if (windowWidth > 1680) {
        multiplyer = 1.15;
      } else if (windowWidth > 1200 && windowWidth <= 1600) {
        multiplyer = 1;
      } else if (windowWidth > 800 && windowWidth <= 1200) {
        multiplyer = 0.75;
      } else if (windowWidth < 800) {
        multiplyer = 0.5;
      }
      setWidth((draft) => {
        draft.multiplyer = multiplyer;
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <myContext.Provider
      value={{
        choice,
        visible,
        width,
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
