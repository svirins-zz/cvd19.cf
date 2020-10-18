/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import L from 'leaflet';
import {
  promiseToFlyTo, trackerFeatureToHtmlMarker, geoJsonToMarkers, getMapData,
} from 'lib';
import {
  PageLayout, Loading, Error, SEO,
} from 'components/layout';
import LeafletMap from '../components/map/LeafletMap';
import { useFetchCountries } from '../hooks';

// TODO map with timescale (weekly)
const Map = () => {
  const { loading, error, data } = useFetchCountries();
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
      <LeafletMap {...mapProps} />
    </PageLayout>
  );
};

export default Map;
