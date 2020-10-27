import React, { useRef, useMemo } from "react";
import { Map, TileLayer } from "react-leaflet";
import { useRefEffect } from "../../hooks";
import { ATTRIBUTION_STRING } from "../../const";
const LeafletMap = ({
  mapEffect,
}: {
  mapEffect: (leafletElement: Map | undefined) => void;
}) => {
  const mapRef = useRef();
  useRefEffect({
    ref: mapRef,
    effect: mapEffect,
  });
  const memoizedMap = useMemo(
    () => (
      <Map
        ref={mapRef}
        zoom={10}
        minZoom={3}
        maxzoom={14}
        center={[0, 0]}
        className="leaflet-container"
      >
        <TileLayer
          url={process.env.GATSBY_OPENSTREETMAP_STATIC_TILES_ENDPOINT ?? ""}
          attribution={ATTRIBUTION_STRING ?? ""}
          tilesize={512}
        />
      </Map>
    ),
    [mapRef]
  );
  return <> {memoizedMap} </>;
};

export default LeafletMap;
