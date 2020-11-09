import React from "react";
import useSWR from "swr";
import { Typography, Row, Col, Divider } from "antd";
import { Page, Loading, Error, SEO } from "components/layout";
import { myContext } from "context";
import { PERIOD_LENGTH } from "const";
import { COUNTRY_QUERY } from "queries";
import { OutbreakStatus, Countries } from "../@types";
import { fetcher } from "api";
import { Table } from "components/tables/table";
import { TodayStats } from "components/data";
import { sumPeriodData, calcStats, calcCountries, calcTrends } from "lib";
import { AreaChart, SummaryChart } from "components/charts";

const { Title, Paragraph, Text } = Typography;

function Index (location, pageContext)  {
  console.log(pageContext)
  // fetch data
  const { data, error } = useSWR<Countries>(COUNTRY_QUERY, fetcher);
  if (!error && !data) return <Loading />;
  if (error) return <Error error={error} />;

  // prepare data to display
  const countries = calcCountries(data, PERIOD_LENGTH);
  // TODO: find another way to deteremine global text trend
  const globalData = sumPeriodData(countries, PERIOD_LENGTH);
  const stats = { ...calcStats(data), trend: globalData[0].periods[0].status };
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
            Covid-19 Global epidemic situation
          </Title>
          <Paragraph>
            daily data update occurs between 04:45 and 05:15 GM
          </Paragraph>
          <Divider className="divider" />
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Title level={5} style={{ marginBottom: "10px" }}>
          Today's stats
        </Title>
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
              <div style={{ height: "450px" }}>
                <SummaryChart
                  periods={trends}
                  multiplyer={context.width!.multiplyer}
                />
              </div>
            </Col>
            <Col span={24}>
              <Title level={5} style={{ marginBottom: "0px" }}>
                Trend 'Under control %' by countries
              </Title>
              <div style={{ height: "450px" }}>
                <AreaChart
                  periods={trends}
                  multiplyer={context.width!.multiplyer}
                  yValue="underControl"
                />
              </div>
            </Col>
            <Col span={24}>
              <Title level={5} style={{ marginBottom: "0px" }}>
                Trend 'Pandemic free %' by countries
              </Title>
              <div style={{ height: "450px" }}>
                <AreaChart
                  periods={trends}
                  multiplyer={context.width!.multiplyer}
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