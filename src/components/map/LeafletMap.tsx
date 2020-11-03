import React, { useRef, useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useRefEffect } from "../../hooks";
import { ATTRIBUTION_STRING } from "../../const";
// TODO:Refactor to react-leaflet 3 https://react-leaflet.js.org/
const LeafletMap = ({ mapEffect }: { mapEffect: (el) => void }) => {
  const mapRef = useRef();
  useRefEffect({
    ref: mapRef,
    effect: mapEffect,
  });
  const memoizedMap = useMemo(
    () => (
      <MapContainer
        ref={mapRef}
        zoom={10}
        minZoom={3}
        maxzoom={14}
        center={[0, 0]}
        className="leaflet-container"
      >
        <TileLayer
          url={process.env.GATSBY_STADIA_STATIC_TILES_ENDPOINT ?? ""}
          attribution={ATTRIBUTION_STRING ?? ""}
          tileSize={512}
        />
      </MapContainer>
    ),
    [mapRef]
  );
  return <> {memoizedMap} </>;
};

export default LeafletMap;
