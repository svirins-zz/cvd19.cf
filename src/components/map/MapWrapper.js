/* eslint-disable react/jsx-filename-extension */
import React, { useRef } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';
import { useRefEffect } from '../../hooks';
import 'leaflet/dist/leaflet.css';
import { ATTRIBUTION_STRING } from '../../const';

const mapSettings = {
  center: [0, 0],
  zoom: 7,
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

MapWrapper.defaultProps = {
  mapEffect: () => {},
};
MapWrapper.propTypes = {
  mapEffect: PropTypes.func,
};
