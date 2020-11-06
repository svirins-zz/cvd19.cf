import React, { useEffect } from "react";
import { Map } from "leaflet";

export const useRefEffect = ({
  effect,
  ref,
}: {
  effect: (leafletElement: Map | undefined) => void;
  ref: React.MutableRefObject<undefined>;
}) => {
  useEffect(() => {
    effect(ref!.current);
  }, [effect, ref]);
};
