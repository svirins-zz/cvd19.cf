import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FeatureCollection } from '../../types';

const MapBoxWrapper = (mapdata: FeatureCollection) => {
  const mapboxToken = process.env.GATSBY_MAPBOX_API_TOKEN || '';
  const mapNode = useRef(null);
  const mapRef = useRef(null);
  const geoJS = JSON.stringify(mapdata).slice(0, -1).slice(11);
  console.log(geoJS);
  // console.log(mapdata);
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
      map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        (error, image) => {
          if (error) throw error;
          map.addImage('custom-marker', image);
          map.addSource('points', {
            type: 'geojson',
            data: geoJS,
          });
          map.addLayer({
            id: 'points',
            type: 'symbol',
            source: 'points',
            layout: {
              'icon-image': 'custom-marker',
              'text-field': ['get', 'title'],
              'text-font': [
                'Open Sans Semibold',
                'Arial Unicode MS Bold',
              ],
              'text-offset': [0, 1.25],
              'text-anchor': 'top',
            },
          });
        },
      );
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

// add sources
// map.addSource('countries', geoJS);
// map.addLayer({
//   id: 'locations',
//   type: 'symbol',
//   source: 'countries',
//   layout: {
//     'icon-image': '{icon}-15',
//     'icon-allow-overlap': true,
//   },
// });
