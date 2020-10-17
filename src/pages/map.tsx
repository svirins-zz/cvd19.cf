/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useQuery } from '@apollo/client';
import L from 'leaflet';
import { promiseToFlyTo, trackerFeatureToHtmlMarker, geoJsonToMarkers } from 'lib/mapUtils';
import getMapData from 'lib/getMapData';

import PageLayout from 'components/layout/pageLayout';
import Loading from 'components/layout/loading';
import Error from 'components/layout/error';
import SEO from 'components/layout/seo';
import MapWrapper from 'components/map/MapWrapper';
import { Countries } from 'types';
import COUNTRY_QUERY from 'queries';

// TODO map with timescale (weekly)
const Map = () => {
  const { loading, error, data } = useQuery<Countries>(COUNTRY_QUERY);
  if (loading) { return <Loading />; }
  if (error) { return <Error error={error} />; }
  // marker click handler
  function handleOnMarkerClick({ feature = {} } = {}, event = {}) {
    const { target = {} } = event;
    const { _map: map = {} } = target;

    const { geometry = {}, properties = {} } = feature;
    const { coordinates } = geometry;
    const { bounds, code } = properties;

    promiseToFlyTo(map, {
      center: {
        lat: coordinates[1],
        lng: coordinates[0],
      },
      zoom: 3,
    });
    // do we really need this?
    if (bounds && code !== 'US') {
      const boundsGeoJsonLayer = new L.GeoJSON(bounds);
      const boundsGeoJsonLayerBounds = boundsGeoJsonLayer.getBounds();
      map.fitBounds(boundsGeoJsonLayerBounds);
    }
  }
  // mapeffect
  const mapEffect = ({ leafletElement: map } = {}) => {
    if (!map) return;
    const locationsGeoJson = getMapData(data);
    const locationsGeoJsonLayers = geoJsonToMarkers(locationsGeoJson, {
      onClick: handleOnMarkerClick,
      featureToHtml: trackerFeatureToHtmlMarker,
    });
    const bounds = locationsGeoJsonLayers.getBounds();
    locationsGeoJsonLayers.addTo(map);
    map.fitBounds(bounds);
  };
  const mapProps = { mapEffect };
 
  return (
    <PageLayout>
      <SEO title="World Map" />
      <MapWrapper {...mapProps} />
    </PageLayout>
  );
};

export default Map;
