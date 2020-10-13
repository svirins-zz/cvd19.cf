import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import PageLayout from '../components/layout/pageLayout';
import Loading from '../components/layout/loading';
import Error from '../components/layout/error';
import SEO from '../components/layout/seo';
import MapBoxWrapper from '../components/map/mapBoxWrapper';
import { Countries } from '../types';
import COUNTRY_QUERY from '../queries';
import calculateMapData from '../utilities/calculateMapData';

const Map = () => {
  const { loading, error, data } = useQuery<Countries>(COUNTRY_QUERY);
  const countriesMapdata = useMemo(() => calculateMapData(data), [data]);

  if (loading) { return <Loading />; }
  if (error) { return <Error error={error} />; }
  return (
    <PageLayout>
      <SEO title="World Map" />
      <MapBoxWrapper countries={countriesMapdata} />
    </PageLayout>
  );
};

export default Map;
