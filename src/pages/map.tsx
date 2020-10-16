import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import L from 'leaflet';
import PageLayout from 'components/layout/pageLayout';
import Loading from 'components/layout/loading';
import Error from 'components/layout/error';
import SEO from 'components/layout/seo';
import MapWrapper from 'components/map/MapWrapper';
import { Countries } from 'types';
import COUNTRY_QUERY from 'queries';
import getMapData from 'utilities/getMapData';
import { promiseToFlyTo, trackerFeatureToHtmlMarker, geoJsonToMarkers } from 'utilities/mapUtils';

// TODO map with timescale (weekly)
const Map = () => {
  const { loading, error, data } = useQuery<Countries>(COUNTRY_QUERY);
  // get GeoJSON string from country query
  const locationsGeoJson: string = useMemo(() => {
    const featuresObject = getMapData(data);
    return JSON.stringify(featuresObject).slice(0, -1).slice(11);
  }, [data]);
  if (loading) { return <Loading />; }
  if (error) { return <Error error={error} />; }

  // Fire a callback once the page renders
  // async function mapEffect({ leafletElement: map } = {}) {
  //   const locationsGeoJsonLayers = geoJsonToMarkers(locationsGeoJson, {
  //     onClick: handleOnMarkerClick,
  //     featureToHtml: trackerFeatureToHtmlMarker,
  //   });
  //   const bounds = locationsGeoJsonLayers.getBounds();
  //   locationsGeoJsonLayers.addTo(map);
  //   map.fitBounds(bounds);
  // }
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
  //       lng: coordinates[0],
  //     },
  //     zoom: 3,
  //   });
  //   // do we really need this?
  //   if (countryBounds && countryCode !== 'US') {
  //     const boundsGeoJsonLayer = new L.GeoJSON(countryBounds);
  //     const boundsGeoJsonLayerBounds = boundsGeoJsonLayer.getBounds();

  //     map.fitBounds(boundsGeoJsonLayerBounds);
  //   }
  // }
  // prepare data for map initialization
  const mapSettings = {
    center: [0, 0],
    zoom: 2,
    // mapEffect,
  };

  return (
    <PageLayout>
      <SEO title="World Map" />
      <MapWrapper mapSettings={mapSettings} />
    </PageLayout>
  );
};

export default Map;
