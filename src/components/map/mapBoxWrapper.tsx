import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FeatureCollection } from '../../types';

const MapBoxWrapper = (mapdata: FeatureCollection) => {
  const mapboxToken = process.env.GATSBY_MAPBOX_API_TOKEN || '';
  const mapNode = useRef(null);
  const mapRef = useRef(null);
  useEffect(() => {
    mapboxgl.accessToken = mapboxToken;
    const map = new mapboxgl.Map({
      container: mapNode.current || '',
      style: process.env.GATSBY_MAPBOX_STYLE,
      center: [-77.04, 38.907],
      zoom: 1,
      minZoom: 1,
      maxZoom: 15,
    });
    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.on('load', () => {
      // add sources
      map.addSource('countries', {
        type: 'geojson',
        data: mapdata,
      });
      map.addLayer({
        id: 'locations',
        type: 'symbol',
        source: 'countries',
        layout: {
          'icon-image': '{icon}-15',
          'icon-allow-overlap': true,
        },
      });
    });
    return () => {
      map.remove();
    };
  }, []);
  return (
    <div ref={mapNode} className="mapStyle" />
  );
};

export default MapBoxWrapper;
