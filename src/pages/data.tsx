import React, { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Typography, Spin } from 'antd';
import PageLayout from '../components/shared/layout/pageLayout';
import SEO from '../components/shared/layout/seo';
import { PERIOD_LENGTH } from '../utilities/periodUtils';
import { Countries } from '../types';
import { calculateData } from '../utilities/calcAllData';
import { sumPeriodData } from '../utilities/calcGlobal';
import DataContent, { PeriodInfo } from '../components/data/dataContent';
import COUNTRY_QUERY from '../queries';

const { Paragraph } = Typography;

const DataPage = () => {
  const [periodInfo, setPeriodInfo] = useState<PeriodInfo>({
    length: PERIOD_LENGTH,
    value: String(PERIOD_LENGTH),
  });
  const { loading, error, data } = useQuery<Countries>(COUNTRY_QUERY);
  const countries = useMemo(() => calculateData(data, periodInfo.length), [data, periodInfo]);
  const allData = [...countries, ...sumPeriodData(countries, periodInfo.length)];
  if (loading) {
    return (
      <PageLayout>
        <SEO title="Status" />
        <Paragraph className="centered">
          {' '}
          <Spin />
          {' '}
          Loading
        </Paragraph>
      </PageLayout>
    );
  }
  if (error) {
    return (
      <PageLayout>
        <SEO title="Status" />
        <Paragraph className="centered">{error.message}</Paragraph>
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
