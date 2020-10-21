import React from 'react';
import L, { LeafletMouseEvent, Map } from 'leaflet';
import { Feature } from '@types';

import {
  promiseToFlyTo, trackerFeatureToHtmlMarker, geoJsonToMarkers, getMapData,
} from 'lib';
import {
  PageLayout, Loading, Error, SEO,
}
  from 'components/layout';
import LeafletMap from '../components/map/LeafletMap';
import { useFetchCountries } from '../hooks';

// TODO map with timescale (weekly)
const MapPage = () => {
  const { loading, error, data } = useFetchCountries();
  if (loading) { return <Loading />; }
  if (error) { return <Error error={error} />; }
  const handleOnMarkerClick = (
    { feature }: { feature: Feature }, event: LeafletMouseEvent,
  ) => {
    const { target } = event;
    const { _map: map } = target;

    const { geometry, properties } = feature;
    const { coordinates } = geometry;
    const { bounds, code } = properties;

    promiseToFlyTo(map, {
      center: [coordinates[1], coordinates[0]], zoom: 3,
    });
    if (bounds && code !== 'US') {
      const boundsGeoJsonLayer = new L.GeoJSON(bounds);
      const boundsGeoJsonLayerBounds = boundsGeoJsonLayer.getBounds();
      map.fitBounds(boundsGeoJsonLayerBounds);
    }
  };
  // mapeffect
  const mapEffect = ({ leafletElement }: {leafletElement: Map | undefined }) => {
    if (!leafletElement) return;
    const locationsGeoJson = getMapData(data);
    const locationsGeoJsonLayers = geoJsonToMarkers(locationsGeoJson, {
      onClick: handleOnMarkerClick,
      featureToHtml: trackerFeatureToHtmlMarker,
    });
    const bounds = locationsGeoJsonLayers.getBounds();
    locationsGeoJsonLayers.addTo(leafletElement);
    leafletElement.fitBounds(bounds);
  };
  // const mapProps = { mapEffect };

  return (
    <PageLayout>
      <SEO title="World Map" />
      <LeafletMap mapEffect={mapEffect} />
    </PageLayout>
  );
};

export default MapPage;
