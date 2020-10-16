import React, { useRef } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useRefEffect } from 'hooks';
import { ATTRIBUTION_STRING } from 'const';

const MapWrapper = (mapSettings) => {
  const { mapEffect } = mapSettings;

  const mapRef = useRef();
  // useRefEffect({
  //   ref: mapRef,
  //   effect: mapEffect,
  // });

  return (
    <div className="leaflet-container">
      <Map ref={mapRef} {...mapSettings}>
        <TileLayer
          url={process.env.GATSBY_MAPBOX_STATIC_TILES_ENDPOINT ?? ''}
          attribution={ATTRIBUTION_STRING ?? ''}
        />
        {/* <ZoomControl position="bottomright" /> */}
      </Map>
    </div>
  );
};

export default MapWrapper;
