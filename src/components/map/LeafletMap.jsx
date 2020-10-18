import React, { useRef } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { useRefEffect } from '../../hooks';
import 'leaflet/dist/leaflet.css';
import { ATTRIBUTION_STRING } from '../../const';

const LeafletMap = (props) => {
  const { mapEffect } = props;
  const mapRef = useRef();
  useRefEffect({
    ref: mapRef,
    effect: mapEffect,
  });

  return (
    <Map
      ref={mapRef}
      zoom={10}
      minZoom={3}
      maxzoom={14}
      center={[0, 0]}
      className="leaflet-container"
    >
      <TileLayer
        url={process.env.GATSBY_MAPBOX_STATIC_TILES_ENDPOINT ?? ''}
        attribution={ATTRIBUTION_STRING ?? ''}
        tilesize={512}
      />
    </Map>
  );
};

export default LeafletMap;
