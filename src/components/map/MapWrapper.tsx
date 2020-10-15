import React, { useRef, useEffect } from 'react';
import { Map as BaseMap, TileLayer, ZoomControl } from 'react-leaflet';

const DEFAULT_MAP_SERVICE = 'OpenStreetMap';

const MapWrapper = (props) => {
  const {
    children, mapEffect, ...rest
  } = props;

  const mapRef = useRef();


useEffect(() => {
  mapEffect( mapRef.current );
}, [mapEffect, mapRef]);


  const services = ???
  const basemap = ???

  const mapSettings = {
    className: 'map-base',
    zoomControl: false,
    ...rest,
  };

  return (
    <BaseMap ref={mapRef} {...mapSettings}>
      { children }
      { basemap && <TileLayer {...basemap} /> }
      <ZoomControl position="bottomright" />
    </BaseMap>
  );
};

export default MapWrapper;

// import React, { useEffect, useRef } from 'react';
// import { Map, TileLayer } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { FeatureCollection } from '../../types';

// const MapWrapper = (mapdata: FeatureCollection) => {
//   const geoJSON = JSON.stringify(mapdata).slice(0, -1).slice(11);
//   console.log(geoJSON);
//   const position: [number, number] = [38.9072, -77.0369];
//   const zoomLevel = 13;
//   const tilesEndpointUrl = process.env.GATSBY_MAPBOX_STATIC_TILES_ENDPOINT ?? '';
//   return (
//     <Map center={position} zoom={zoomLevel}>
//       <TileLayer
//         url={tilesEndpointUrl}
//         attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>
//       "
//       />
//     </Map>
//   );
// };

// export default MapWrapper;

// // const mapNode = useRef(null);
// // const mapRef = useRef(null);

// // const mapboxToken = process.env.GATSBY_MAPBOX_API_TOKEN || '';
// // const mapNode = useRef(null);
// // const mapRef = useRef(null);
// //   mapRef.current = map;

// import React from 'react';
// import L from 'leaflet';
// import Map from '../temp';
// import {FeatureCollection} from '../'

// const LOCATION = {
//   lat: 38.9072,
//   lng: -77.0369,
// };
// const CENTER = [LOCATION.lat, LOCATION.lng];
// const DEFAULT_ZOOM = 2;
// mapServices

//   async function mapEffect({ leafletElement: map } = {}) {

//   }

//   const mapSettings = {
//     center: CENTER,
//     defaultBaseMap: 'OpenStreetMap',
//     zoom: DEFAULT_ZOOM,
//     mapEffect,
//   };

//   return (
//     <Layout pageName="home">

//       <Map {...mapSettings} />

//     </Layout>
//   );
// };

// export default MapWrapper;
