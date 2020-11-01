import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Typography, Row, Col, Divider } from "antd";
import { Page, Loading, Error, SEO } from "components/layout";
import { PERIOD_LENGTH } from "const";
import COUNTRY_QUERY from "queries";
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
import TotalTable from "components/tables/TotalTable";
import { Summary } from "components/data";
import { OutbreakStatus, Countries } from "../@types";

const { Title, Paragraph } = Typography;
// TODO: Refactor Victory=>antD charts ??
const IndexPage = () => {
  // query countries data
  const { loading, error, data } = useQuery<Countries>(COUNTRY_QUERY);
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
  const losingData = countries.filter(
    (country) =>
      country.periods[0].status === OutbreakStatus.Losing ||
      country.periods[0].status === OutbreakStatus.Flattening
  );
  const winningData = countries.filter(
    (country) =>
      country.periods[0].status === OutbreakStatus.Winning ||
      country.periods[0].status === OutbreakStatus.Won
  );
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }
  const summaryStats = calculateSummaryData(data);
  const trend = globalData[0].periods[0].status ?? OutbreakStatus.None;
  return (
    <Page>
      <SEO title="Status" />
      <Row gutter={[8, 8]}>
        <Col span={24}>
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
        <Col span={24}>
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
        <Col span={24}>
          <Title level={3} style={{ marginBottom: "0px" }}>
            New death cases by countries (last two periods)
          </Title>
          <Paragraph>lessening / rising</Paragraph>
          <Divider className="divider" />
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <TotalTable
            data={winningData}
            periodLength={PERIOD_LENGTH}
            order={false}
            kind={"newDeaths"}
            size={4}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <TotalTable
            data={losingData}
            periodLength={PERIOD_LENGTH}
            order={true}
            kind={"newDeaths"}
            size={4}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default IndexPage;
