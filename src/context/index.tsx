import React, { useEffect } from "react";
import { useImmer } from "use-immer";

import { AuxProps, ContextProps } from "../@types";

export const myContext = React.createContext<Partial<ContextProps>>({});

const Provider = ({ children }: AuxProps) => {
  const [choice, setChoice] = useImmer({
    key: "main",
  });
  const [visible, setVisible] = useImmer({
    isVisible: false,
  });
  const [width, setWidth] = useImmer({
    multiplyer: 1,
  });

  const handleResize = () => {
    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let multiplyer = 0.75;
    if (windowWidth < 570) {
      multiplyer = 0.2;
    } else if (windowWidth < 670 && windowWidth >= 570) {
      multiplyer = 0.3;
    } else if (windowWidth < 800 && windowWidth >= 670) {
      multiplyer = 0.45;
    } else if (windowWidth > 800 && windowWidth <= 900) {
      multiplyer = 0.6;
    } else if (windowWidth > 900 && windowWidth <= 1200) {
      multiplyer = 0.6;
    } else if (windowWidth > 1680) {
      multiplyer = 1.15;
    } else if (windowWidth > 1200 && windowWidth <= 1600) {
      multiplyer = 1;
    }
    setWidth((draft) => {
      draft.multiplyer = multiplyer;
    });
  };
  // calculate multiplyer, based on global window width
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  useEffect(() => {
    handleResize();
  }, []);
  const handleSelect = (info: {
    selectedKeys: React.Key[] | React.Key;
  }): void => {
    setChoice((draft) => {
      draft.key = info.selectedKeys as string;
    });
  };
  return (
    <myContext.Provider
      value={{
        choice,
        visible,
        width,
        handleSelect,
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

export default function MyContext({
  element,
}: {
  element: React.ReactChildren;
}): JSX.Element {
  return <Provider>{element}</Provider>;
}
