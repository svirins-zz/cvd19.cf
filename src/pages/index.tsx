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
import SummaryChart from '../components/status/summaryChart';
import { Countries } from '../utilities/types/data';
import { calculateData } from '../utilities/calcAllData';
import { PERIOD_LENGTH } from '../utilities/periodUtils';
import { sumPeriodData, calculateGlobalSummary } from '../utilities/calcGlobal';
import OutbreakStatus from '../utilities/types/OutbreakStatus';
import CountryQuery from '../utilities/query';
import PandemicFreeChart from '../components/status/pandemicFreeChart';
import UnderControlChart from '../components/status/underControlChart';

const { Title, Paragraph } = Typography;
// TODO: Refactor Victory=>antD charts!
const IndexPage = () => {
  const { loading, error, data } = useQuery<Countries>(CountryQuery);
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
    <PageLayout>
      <SEO title="Status" />
      <Title className="centered" level={1}>How is the world doing?</Title>
      <Paragraph className="centered">
        In the last 5 days we&apos;ve
        {globalData[0].periods[0].status === OutbreakStatus.Won
          ? ' '
          : ' been '}
        {getStatusInfo(globalData[0].periods[0].status)}
        {' '}
        <Divider />
      </Paragraph>
      {/* TODO: Implement summary */}
      {/* removed global summary */}
      {/* <Paragraph className="centered">
        <GrowthSummaryTable data={globalData} periodLength={PERIOD_LENGTH} />
      </Paragraph> */}
      {/* <Divider /> */}
      <Paragraph className="centered">
        <Title level={3}>In how many places are winning?</Title>
        <SummaryChart data={globalSummarySinceTwoMonths} />
      </Paragraph>
      <Divider />
      <Paragraph className="centered">
        <Title level={3}>How many places have the pandemic under control?</Title>
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
        <Title level={3}> How much of the world is pandemic free?</Title>
        <PandemicFreeChart data={globalSummaryData} />
      </Paragraph>
      <Divider />
      <Row>
        <Col span={9} offset={2}>
          <Title level={4}>Positive new death cases dynamics (first 20) ?</Title>
          <GrowthSummaryTable data={winningData} periodLength={PERIOD_LENGTH} />
          <Link to="/data"><Button>More data ...</Button></Link>
        </Col>
        <Col span={9} offset={2}>
          <Title level={4}>Negative new death cases dynamics (first 20) ?</Title>
          <GrowthSummaryTable data={losingData} periodLength={PERIOD_LENGTH} />
          <Link to="/data"><Button>More data ...</Button></Link>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default IndexPage;
