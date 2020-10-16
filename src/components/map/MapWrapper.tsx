import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import { promiseToFlyTo, trackerFeatureToHtmlMarker, geoJsonToMarkers } from 'utilities/mapUtils';

import 'leaflet/dist/leaflet.css';
import { ATTRIBUTION_STRING } from 'const';

const MapWrapper = (mapGeoData: string) => {
  const mapRef = useRef();
  console.log(mapGeoData);
  // Fire a callback once the page renders
  const mapEffect = ({ map }) => {
    console.log(map);
    return map;
  };
  //   const locationsGeoJsonLayers = geoJsonToMarkers(locationsGeoJson, {
  //     onClick: handleOnMarkerClick,
  //     featureToHtml: trackerFeatureToHtmlMarker,
  //   });
  //   const bounds = locationsGeoJsonLayers.getBounds();
  //   locationsGeoJsonLayers.addTo(map);
  //   map.fitBounds(bounds);
  // }mapmap
  // // add click handler
  // function handleOnMarkerClick({ feature = {} } = {}, event = {}) {
  //   const { target = {} } = event;
  //   const { _map: map = {} } = target;

  //   const { geometry = {}, properties = {} } = feature;
  //   const { coordinates } = geometry;
  //   const { countryBounds, countryCode } = properties;

  //   promiseToFlyTo(map, {
  //     center: {
  //       lat: coordinates[1],
  //       lng: coordinatemaps[0],
  //     },map
  //     zoom: 3,
  //   });
  //   // do we really need this?
  //   if (countryBounds && countryCode !== 'US') {
  //     const boundsGeoJsonLayer = new L.GeoJSON(countryBounds);
  //     const boundsGeoJsonLayerBounds = boundsGeoJsonLayer.getBounds();

  //     map.fitBounds(boundsGeoJsonLayerBounds);
  //   }
  // prepare data for map initialization
  useEffect(() => {
    mapEffect(mapRef.current);
  }, [mapRef, mapEffect]);

  const mapSettings = {
    center: [0, 0],
    zoom: 4,
  };

  return (
    <div className="leaflet-container">
      <Map ref={mapRef} {...mapSettings}>
        <TileLayer
          url={process.env.GATSBY_MAPBOX_STATIC_TILES_ENDPOINT ?? ''}
          attribution={ATTRIBUTION_STRING ?? ''}
          tilesize={512}
        />
        {/* <ZoomControl position="bottomright" /> */}
      </Map>
    </div>
  );
};

export default MapWrapper;
