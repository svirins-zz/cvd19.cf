import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import {
  Typography, Row, Col, Divider,
} from 'antd';
import PageLayout from 'components/layout/pageLayout';
import Loading from 'components/layout/loading';
import Error from 'components/layout/error';
import SEO from 'components/layout/seo';
import { GrowthSummaryTable } from 'components/tables/prepareTables';
import { getStatusInfo } from 'components/data/legend';
import { PERIOD_LENGTH } from 'const';
import { sumPeriodData, calculateGlobalSummary, calculateTotalGlobal } from 'lib/calcGlobal';
import { calculateData } from 'lib/calcAllData';
import COUNTRY_QUERY from 'queries';
import PandemicFreeChart from 'components/charts/pandemicFreeChart';
import UnderControlChart from 'components/charts/underControlChart';
import SummaryChart from 'components/charts/summaryChart';
import TotalSummary from 'components/data/totalSummary';
import { Countries, OutbreakStatus } from 'types';

const { Title, Paragraph } = Typography;
// TODO: Refactor Victory=>antD charts!
// TODO: Refactor pre-render Statistics calculations into separate module
// TODO: check memoization for re-render. Memoize everything!!
// TODO refactor load countries data to custom react hook !
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

  if (loading) { return <Loading />; }
  if (error) { return <Error error={error} />; }

  const globalTotalData = calculateTotalGlobal(data);
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
            {getStatusInfo(globalData[0].periods[0].status)}
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
