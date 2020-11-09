import React from "react";
import { Typography, Row, Col, Divider } from "antd";
import { Page, SEO } from "components/layout";
import { myContext } from "context";
import { PERIOD_LENGTH } from "const";
import { OutbreakStatus, Countries } from "../@types";
import { Table } from "components/tables/table";
import { TodayStats } from "components/data";
import { sumPeriodData, calcStats, calcCountries, calcTrends } from "lib";
import { AreaChart, SummaryChart } from "components/charts";

const { Title, Text } = Typography;

const Index = ({
  pageContext,
}: {
  pageContext: GatsbyTypes.SitePageContext;
}) => {
  // get build-time data
  const data = pageContext.data;
  // prepare data to display
  const countries = calcCountries(data as Countries, PERIOD_LENGTH);
  // TODO: find another way to deteremine global text trend
  const globalData = sumPeriodData(countries, PERIOD_LENGTH);
  const stats = {
    ...calcStats(data as Countries),
    trend: globalData[0].periods[0].status,
  };
  const trends = calcTrends(countries, PERIOD_LENGTH);
  const loseTableData = countries.filter(
    (country) =>
      country.periods[0].status === OutbreakStatus.Losing ||
      country.periods[0].status === OutbreakStatus.Flattening
  );
  const winTableData = countries.filter(
    (country) =>
      country.periods[0].status === OutbreakStatus.Winning ||
      country.periods[0].status === OutbreakStatus.Won
  );
  return (
    <Page>
      <SEO title="Covid-19 Global epidemic situation" />
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Title level={3} style={{ marginBottom: "0px" }}>
            Covid-19 Global pandemic situation
          </Title>
          <Title level={5} style={{ marginBottom: "10px" }}>
            Today's stats (data updated 3-times per day)
          </Title>
          <Divider className="divider" />
        </Col>
        <Col span={24}>
          <TodayStats stats={stats} />
        </Col>
      </Row>
      <myContext.Consumer>
        {(context) => (
          <>
            <Col span={24}>
              <Title level={5} style={{ marginBottom: "0px" }}>
                Global data trends by countries
              </Title>
              <Divider className="divider" />
              <div style={{ height: "450px" }}>
                <SummaryChart
                  periods={trends}
                  multiplyer={context.width?.multiplyer ?? 1}
                />
              </div>
            </Col>
            <Col span={24}>
              <Title level={5} style={{ marginBottom: "0px" }}>
                Trend 'Under control %' by countries
              </Title>
              <Divider className="divider" />
              <div style={{ height: "450px" }}>
                <AreaChart
                  periods={trends}
                  multiplyer={context.width?.multiplyer ?? 1}
                  yValue="underControl"
                />
              </div>
            </Col>
            <Col span={24}>
              <Title level={5} style={{ marginBottom: "0px" }}>
                Trend 'Pandemic free %' by countries
              </Title>
              <Divider className="divider" />
              <div style={{ height: "450px" }}>
                <AreaChart
                  periods={trends}
                  multiplyer={context.width?.multiplyer ?? 1}
                  yValue="pandemicFree"
                />
              </div>
            </Col>
          </>
        )}
      </myContext.Consumer>
      <Col span={24}>
        <Title level={5} style={{ marginBottom: "0px" }}>
          New death cases by countries (last two periods)
        </Title>
        <Divider className="divider" />
      </Col>
      <Row gutter={0}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          style={{ paddingRight: "10px" }}
        >
          <Text>Winning / Won trends</Text>
          <Table
            data={winTableData}
            periodLength={PERIOD_LENGTH}
            order={false}
            kind={"newDeaths"}
            variation={"tight"}
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          style={{ paddingLeft: "10px" }}
        >
          <Text>Losing / Flattening trends</Text>
          <Table
            data={loseTableData}
            periodLength={PERIOD_LENGTH}
            order={true}
            kind={"newDeaths"}
            variation={"tight"}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default Index;
