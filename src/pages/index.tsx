import React, { useMemo } from "react";
import { Typography, Row, Col, Divider } from "antd";
import { Page, Loading, Error, SEO } from "components/layout";
import { PERIOD_LENGTH } from "const";
import {
  sumPeriodData,
  calculateSummaryData,
  calculateData,
  calculateGlobalSummary,
} from "lib";
import {
  PandemicFreeChart,
  UnderControlChart,
  SummaryChart,
} from "components/charts";
import { GrowthSummaryTable } from "components/tables/AllTables";
import { Summary } from "components/data";
import { useFetchCountries } from "../hooks";
import { OutbreakStatus } from "../@types";

const { Title, Paragraph } = Typography;
// TODO: Refactor Victory=>antD charts ??
// TODO: Do we really need global column? data.tsx=>sumPeriodData
const IndexPage = () => {
  // query countries data
  const { loading, error, data } = useFetchCountries();
  // prepare data to display
  const countries = useMemo(() => calculateData(data, PERIOD_LENGTH), [data]);
  const globalData = useMemo(() => sumPeriodData(countries, PERIOD_LENGTH), [
    countries,
  ]);
  const globalSummaryData = useMemo(
    () => calculateGlobalSummary(countries, PERIOD_LENGTH),
    [countries]
  );
  const globalSummarySinceTwoMonths = globalSummaryData.slice(
    60 / PERIOD_LENGTH
  );
  const losingData = useMemo(
    () =>
      countries.filter(
        (country) =>
          country.periods[0].status === OutbreakStatus.Losing ||
          country.periods[0].status === OutbreakStatus.Flattening
      ),
    [countries]
  );
  const winningData = useMemo(
    () =>
      countries.filter(
        (country) =>
          country.periods[0].status === OutbreakStatus.Winning ||
          country.periods[0].status === OutbreakStatus.Won
      ),
    [countries]
  );
  const summaryStats = useMemo(() => calculateSummaryData(data), [data]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }
  const trend = globalData[0].periods[0].status ?? OutbreakStatus.None;
  return (
    <Page>
      <SEO title="Status" />
      <Row gutter={[8, 8]}>
        <Col offset={2} span={20}>
          <Title level={3} style={{ marginBottom: "0px" }}>
            Covid-19 Global epidemic situation
          </Title>
          <Paragraph>
            daily data update occurs between 04:45 and 05:15 GM
          </Paragraph>
          <Divider className="divider" />
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col offset={2} span={20}>
          <Summary stats={summaryStats} trend={trend} />
        </Col>
      </Row>
      <SummaryChart
        data={globalSummarySinceTwoMonths}
        title="Global data trends"
      />
      <UnderControlChart
        data={globalSummaryData}
        title="Trend 'Under control'"
      />
      <PandemicFreeChart
        data={globalSummaryData}
        title="Trend 'Pandemic free'"
      />
      <Row gutter={0}>
        <Col span={20} offset={2}>
          <Title level={3} style={{ marginBottom: "0px" }}>
            New death cases by countries (last two periods)
          </Title>
          <Paragraph>lessening / rising</Paragraph>
          <Divider className="divider" />
        </Col>
      </Row>
      <Row>
        <Col xs={20} sm={20} md={20} lg={9} xl={9} offset={2}>
          <GrowthSummaryTable
            data={winningData}
            periodLength={PERIOD_LENGTH}
            order={false}
          />
        </Col>
        <Col xs={20} sm={20} md={20} lg={9} xl={9} offset={2}>
          <GrowthSummaryTable
            data={losingData}
            periodLength={PERIOD_LENGTH}
            order={true}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default IndexPage;
