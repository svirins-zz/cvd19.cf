import React, { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import PageLayout from '../components/shared/layout/pageLayout';
import SEO from '../components/shared/layout/seo';
import { PERIOD_LENGTH } from '../utilities/periodUtils';
import { Countries } from '../utilities/types/data';
import { calculateData } from '../utilities/calcAllData';
import { sumPeriodData } from '../utilities/calcGlobal';
import DataContent, { PeriodInfo } from '../components/data/dataContent';
import CountryQuery from '../utilities/query';

const DataPage = () => {
  const [periodInfo, setPeriodInfo] = useState<PeriodInfo>({
    length: PERIOD_LENGTH,
    value: String(PERIOD_LENGTH),
  });
  const { loading, error, data } = useQuery<Countries>(CountryQuery);
  const countries = useMemo(() => calculateData(data, periodInfo.length), [data, periodInfo]);
  const allData = [...countries, ...sumPeriodData(countries, periodInfo.length)];
  if (loading) {
    return (
      <PageLayout>
        <SEO title="All Data" />
        <p style={{ textAlign: 'center' }}>Loading</p>
      </PageLayout>
    );
  }
  if (error) {
    return (
      <PageLayout>
        <SEO title="All Data" />
        <p>{error.message}</p>
      </PageLayout>
    );
  }
  return (
    <DataContent
      countries={allData}
      periodInfo={periodInfo}
      onPeriodChange={(event) => {
        const length = Number(event.target.value);
        if (length > 0) {
          setPeriodInfo({
            length,
            value: event.target.value,
          });
        } else {
          setPeriodInfo({
            length: 5,
            value: event.target.value,
          });
        }
      }}
    />
  );
};

export default DataPage;
