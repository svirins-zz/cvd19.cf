import React, { useRef, useEffect } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ATTRIBUTION_STRING } from 'const';

const mapSettings = {
  center: [0, 0],
  zoom: 4,
};

const MapWrapper = (mapEffect) => {
  console.log(mapEffect);
  // const obj = getMapData(data);
  // ????????????????????
  const mapRef = useRef();
  useEffect(() => {
    mapEffect(mapRef.current);
  }, [mapEffect, mapRef]);

  return (
    <div className="leaflet-container">
      <Map ref={mapRef} {...mapSettings}>
        <TileLayer
          url={process.env.GATSBY_MAPBOX_STATIC_TILES_ENDPOINT ?? ''}
          attribution={ATTRIBUTION_STRING ?? ''}
          tilesize={512}
        />
      </Map>
    </div>
  );
};

export default MapWrapper;
