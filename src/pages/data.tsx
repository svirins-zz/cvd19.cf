import React, { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Typography, Spin } from 'antd';
import PageLayout from '../components/layout/pageLayout';
import SEO from '../components/layout/seo';
import { PERIOD_LENGTH } from '../utilities/periodUtils';
import { Countries, PeriodInfo } from '../types';
import { calculateData } from '../utilities/calcAllData';
import { sumPeriodData } from '../utilities/calcGlobal';
import DataContent from '../components/data/dataContent';
import COUNTRY_QUERY from '../queries';

const { Paragraph, Title } = Typography;
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
        <Paragraph className="centered" style={{ height: '100vh', paddingTop: '15%' }}>
          <div style={{ verticalAlign: 'middle' }}>
            {' '}
            <Spin size="large" />
            {' '}
            <Title level={5}>Loading</Title>
          </div>
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
      onPeriodChange={(val: number) => {
        const length = val;
        if (length > 0) {
          setPeriodInfo({
            length: val,
            value: val.toString(),
          });
        } else {
          setPeriodInfo({
            length: 5,
            value: val.toString(),
          });
        }
      }}
    />
  );
};

export default DataPage;
