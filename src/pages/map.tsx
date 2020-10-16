import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import PageLayout from 'components/layout/pageLayout';
import Loading from 'components/layout/loading';
import Error from 'components/layout/error';
import SEO from 'components/layout/seo';
import MapWrapper from 'components/map/MapWrapper';
import { Countries } from 'types';
import COUNTRY_QUERY from 'queries';
import getMapData from 'utilities/getMapData';

// TODO map with timescale (weekly)
const Map = () => {
  const { loading, error, data } = useQuery<Countries>(COUNTRY_QUERY);
  // get GeoJSON string from country query
  const locationsGeoJson: string = useMemo(() => {
    const featuresObject = getMapData(data);
    return JSON.stringify(featuresObject).slice(0, -1).slice(10);
  }, [data]);
  if (loading) { return <Loading />; }
  if (error) { return <Error error={error} />; }

  return (
    <PageLayout>
      <SEO title="World Map" />
      <MapWrapper mapGeoData={locationsGeoJson} />
    </PageLayout>
  );
};

export default Map;
