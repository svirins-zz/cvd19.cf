import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapBoxWrapper = (countries) => {
  const mapboxToken = process.env.GATSBY_MAPBOX_API_TOKEN || '';
  const mapNode = useRef(null);
  const mapRef = useRef(null);
  const sources = {
    oregon: {
      type: 'geojson',
      data: {
        type: 'Polygon',
        coordinates: [
          [
            [-124.03564453125, 46.195042108660154],
            [-124.5849609375, 42.89206418807337],
            [-124.365234375, 42.049292638686836],
            [-117.00439453125, 42.049292638686836],
            [-116.96044921875, 45.99696161820381],
            [-118.98193359375, 46.027481852486645],
            [-121.201171875, 45.66012730272194],
            [-122.32177734375, 45.61403741135093],
            [-122.76123046875, 45.644768217751924],
            [-122.98095703125, 46.195042108660154],
            [-123.6181640625, 46.240651955001695],
            [-124.03564453125, 46.195042108660154],
          ],
        ],
      },
    },
  };
  const layers = [
    {
      id: '1',
      source: 'oregon',
      type: 'fill',
      paint: {
        'fill-color': 'red',
        'fill-opacity': 0.5,
      },
    },
  ];
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
      console.log('map onload');
      // add sources
      Object.entries(sources).forEach(([id, source]) => {
        map.addSource(id, source);
      });

      // add layers
      layers.forEach((layer) => {
        map.addLayer(layer);
      });
    });

    // hook up map events here, such as click, mouseenter, mouseleave
    // e.g., map.on('click', (e) => {})

    return () => {
      map.remove();
    };
  }, []);

  // You can use other `useEffect` hooks to update the state of the map
  // based on incoming props.  Just beware that you might need to add additional
  // refs to share objects or state between hooks.

  return (
    <div ref={mapNode} className="mapStyle" />
  );
};

export default MapBoxWrapper;
