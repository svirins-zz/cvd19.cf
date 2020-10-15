import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import PageLayout from '../components/layout/pageLayout';
import Loading from '../components/layout/loading';
import Error from '../components/layout/error';
import SEO from '../components/layout/seo';
import MapBoxWrapper from '../components/map/mapBoxWrapper';
import { Countries, FeatureCollection } from '../types';
import COUNTRY_QUERY from '../queries';
import getMapData from '../utilities/getMapData';

const Map = () => {
  const { loading, error, data } = useQuery<Countries>(COUNTRY_QUERY);
  const mapData: FeatureCollection = useMemo(() => getMapData(data), [data]);
  console.log(mapData)
  if (loading) { return <Loading />; }
  if (error) { return <Error error={error} />; }

  // TODO map with timescale (weekly)
  return (
    <PageLayout>
      <SEO title="World Map" />
      <MapBoxWrapper mapdata={mapData} />
    </PageLayout>
  );
};

export default Map;
