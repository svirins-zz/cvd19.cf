import React, { useMemo } from 'react';
import {
  Typography, Row, Col, Divider,
} from 'antd';
import {
  PageLayout, Loading, Error, SEO,
} from 'components/layout';
import { GrowthSummaryTable } from 'components/tables/prepareTables';
import { PERIOD_LENGTH } from 'const';
import {
  sumPeriodData, calculateGlobalSummary, calculateTotalGlobal, calculateData,
} from 'lib';
import { PandemicFreeChart, UnderControlChart, SummaryChart } from 'components/charts';
import { TotalSummary } from '../components/data';
import { useFetchCountries } from '../hooks';
import { OutbreakStatus } from '../@types';

const { Title, Paragraph } = Typography;
// TODO: Refactor Victory=>antD charts!
const IndexPage = () => {
  // query countries data
  const { loading, error, data } = useFetchCountries();
  // prepare data to display
  const countries = useMemo(() => calculateData(data, PERIOD_LENGTH), [data]);
  const globalData = useMemo(() => sumPeriodData(countries, PERIOD_LENGTH), [countries]);
  const globalSummaryData = useMemo(() => calculateGlobalSummary(countries, PERIOD_LENGTH),
    [countries]);
  const globalSummarySinceTwoMonths = globalSummaryData.slice(60 / PERIOD_LENGTH);
  const losingData = countries.filter(
    (country) => country.periods[0].status === OutbreakStatus.Losing
      || country.periods[0].status === OutbreakStatus.Flattening,
  );
  const winningData = countries.filter(
    (country) => country.periods[0].status === OutbreakStatus.Winning
      || country.periods[0].status === OutbreakStatus.Won,
  );
  if (loading) { return <Loading />; }
  if (error) { return <Error error={error} />; }
  const globalTotalData = calculateTotalGlobal(data);
  //TODO: add color tag for status page
  return (
    <PageLayout>
      <SEO title="Status" />
      <Row gutter={[8, 16]}>
        <Col offset={2} span={20}>
          <Title level={3} style={{ marginBottom: '0px' }}>Covid-19 pandemic data</Title>
          <Paragraph>Daily data update occurs between 04:45 and 05:15 GM</Paragraph>
          <Divider className="divider" />
          <Paragraph>
            Current status: In the last 5 days we&apos;ve
            {globalData[0].periods[0].status === OutbreakStatus.Won
              ? ' '
              : ' been '}
            {globalData[0].periods[0].status}
          </Paragraph>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col offset={2} span={20}>
          <TotalSummary globalData={globalTotalData} />
        </Col>
      </Row>
      <SummaryChart data={globalSummarySinceTwoMonths} title="In how many places are winning?" />
      <UnderControlChart data={globalSummaryData} title="How many places have the pandemic under control?" />
      <PandemicFreeChart data={globalSummaryData} title="How much of the world is pandemic free?" />
      <Row gutter={[8, 16]}>
        <Col span={20} offset={2}>
          <Title level={3} style={{ marginBottom: '0px' }}>New death cases by countries</Title>
          <Paragraph>Lessening / Growing</Paragraph>
        </Col>
      </Row>
      <Row>
        <Col xs={20} sm={20} md={20} lg={9} xl={9} offset={2}>
          <GrowthSummaryTable data={winningData} periodLength={PERIOD_LENGTH} desc={false} />
        </Col>
        <Col xs={20} sm={20} md={20} lg={9} xl={9} offset={2}>
          <GrowthSummaryTable data={losingData} periodLength={PERIOD_LENGTH} desc />
        </Col>
      </Row>
    </PageLayout>
  );
};

export default IndexPage;
