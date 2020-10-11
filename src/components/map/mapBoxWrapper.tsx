import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapOptions } from '../../types';

const MapBoxWrapper = ({
  width = 'auto',
  height = '100%',
  zoom = 0,
  center = [0, 0],
  padding = 0.1,
  sources = {},
  styles = ['light-v9', 'dark-v9', 'streets-v11'],
  layers = [],
  minZoom = 0,
  maxZoom = 24,
}: MapOptions) => {
  const mapboxToken: string = process.env.GATSBY_MAPBOX_API_TOKEN || '';

  if (!mapboxToken) {
    console.error(
      'ERROR: Mapbox token is required in gatsby-config.js siteMetadata',
    );
  }
  // this ref holds the map DOM node so that we can pass it into Mapbox GL
  const mapNode = useRef();

  // this ref holds the map object once we have instantiated it, so that we
  // can use it in other hooks
  const mapRef = useRef();

  // construct the map within an effect that has no dependencies
  // this allows us to construct it only once at the time the
  // component is constructed.
  useEffect(() => {
    const mapCenter: [number, number] = center;
    const mapZoom: number = zoom;

    // Token must be set before constructing map
    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      width,
      height,
      layers,
      styles,
      container: mapNode.current,
      style: `mapbox://styles/mapbox/${styles[0]}`,
      center: mapCenter,
      zoom: mapZoom,
      minZoom,
      maxZoom,
    });
    mapRef.current = map;
    window.map = map; // for easier debugging and querying via console

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('load', () => {
      // add loading indicator
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

    // when this component is destroyed, remove the map
    return () => {
      map.remove();
    };
  }, []);

  // You can use other `useEffect` hooks to update the state of the map
  // based on incoming props.  Just beware that you might need to add additional
  // refs to share objects or state between hooks.

  return (
    <div ref={mapNode} style={{ width: '100%', height: '100%' }} />
  );
};

export default MapBoxWrapper;
