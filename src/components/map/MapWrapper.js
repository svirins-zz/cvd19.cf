/* eslint-disable react/jsx-filename-extension */
// this have to be plain js !
import React, { useRef } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { useRefEffect } from '../../hooks';
import 'leaflet/dist/leaflet.css';
import { ATTRIBUTION_STRING } from '../../const';

const mapSettings = {
  center: [0, 0],
  zoom: 8,
  className: 'leaflet-container',
};
const MapWrapper = (props) => {
  const { mapEffect } = props;
  const mapRef = useRef();
  useRefEffect({
    ref: mapRef,
    effect: mapEffect,
  });

  return (
    <Map
      ref={mapRef}
      {...mapSettings}
    >
      <TileLayer
        url={process.env.GATSBY_MAPBOX_STATIC_TILES_ENDPOINT ?? ''}
        attribution={ATTRIBUTION_STRING ?? ''}
        tilesize={512}
      />
    </Map>
  );
};

export default MapWrapper;
