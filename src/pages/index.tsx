import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'gatsby';
import {
  Typography, Divider, Spin, Row, Col, Button,
} from 'antd';
import PageLayout from '../components/shared/layout/pageLayout';
import SEO from '../components/shared/layout/seo';
import { GrowthSummaryTable } from '../components/shared/tables/tables';
import { getStatusInfo } from '../components/details/legend';
import SummaryChart from '../components/charts/summaryChart';
import { calculateData } from '../utilities/calcAllData';
import { PERIOD_LENGTH } from '../utilities/periodUtils';
import { sumPeriodData, calculateGlobalSummary, calculateTotalGlobal } from '../utilities/calcGlobal';
import COUNTRY_QUERY from '../queries';
import PandemicFreeChart from '../components/charts/pandemicFreeChart';
import UnderControlChart from '../components/charts/underControlChart';
import TotalSummary from '../components/status/totalSummary';

// Types import
import { Countries, OutbreakStatus } from '../types';

const { Title, Paragraph, Text } = Typography;
// TODO: Refactor Victory=>antD charts!
// TODO: Refactor pre-render Statistics calculations into separate module
// TODO: check memoization for re-render
const IndexPage = () => {
  const { loading, error, data } = useQuery<Countries>(COUNTRY_QUERY);
  const countries = useMemo(() => calculateData(data, PERIOD_LENGTH), [data]);
  const globalData = sumPeriodData(countries, PERIOD_LENGTH);
  const globalSummaryData = calculateGlobalSummary(countries, PERIOD_LENGTH);
  const globalSummarySinceTwoMonths = globalSummaryData.slice(60 / PERIOD_LENGTH);

  const losingData = countries.filter(
    (country) => country.periods[0].status === OutbreakStatus.Losing
      || country.periods[0].status === OutbreakStatus.Flattening,
  );
  const winningData = countries.filter(
    (country) => country.periods[0].status === OutbreakStatus.Winning
      || country.periods[0].status === OutbreakStatus.Won,
  );

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
  // TODO: constructing global statistics data
  const globalTotalData = calculateTotalGlobal(data);
  // TODO: Move Legend data here (2 columns)
  return (
    <PageLayout>
      <SEO title="Status" />
      <Paragraph className="centered">
        <Title level={1}>Current state of the Covid-19 pandemic</Title>
        <Text className="largeText">
          In the last 5 days we&apos;ve
          {globalData[0].periods[0].status === OutbreakStatus.Won
            ? ' '
            : ' been '}
        </Text>
        {getStatusInfo(globalData[0].periods[0].status)}
        <TotalSummary globalData={globalTotalData} />
        <span className="italic">Daily data update occurs between 04:45 and 05:15 GM</span>
      </Paragraph>
      <Divider />
      <Paragraph className="centered">
        <Title level={2}>In how many places are winning?</Title>
        <SummaryChart data={globalSummarySinceTwoMonths} />
      </Paragraph>
      <Divider />
      <Paragraph className="centered">
        <Title level={2}>How many places have the pandemic under control?</Title>
        The
        {' '}
        <em>Won</em>
        {' '}
        status above only looks at deaths, and should therefore be a slight leading
        indicator compared to the
        {' '}
        <em>Pandemic Free</em>
        {' '}
        status
        in the chart below, which requires both no deaths and no cases.
        {' '}
        <em>Pandemic Free</em>
        {' '}
        should also decrease in the begging as outbreaks start, and then increase once countries
        successfully eradicate the virus.
        <UnderControlChart data={globalSummaryData} />
      </Paragraph>
      <Divider />
      <Paragraph className="centered">
        <Title level={2}> How much of the world is pandemic free?</Title>
        <PandemicFreeChart data={globalSummaryData} />
      </Paragraph>
      <Divider />
      {/* TODO: SUPER IMPORTANT - IMPLEMENT SORTING BY CASES! */}
      <Row>
        <Col span={9} offset={2}>
          <Title level={5}>Positive dynamics. New death cases (first 20) ?</Title>
          <GrowthSummaryTable data={winningData} periodLength={PERIOD_LENGTH} />
          <Link to="/data"><Button>More data ...</Button></Link>
        </Col>
        <Col span={9} offset={2}>
          <Title level={5}>Negative dynamics. New death cases (first 20) ?</Title>
          <GrowthSummaryTable data={losingData} periodLength={PERIOD_LENGTH} />
          <Link to="/data"><Button>More data ...</Button></Link>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default IndexPage;
