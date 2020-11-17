import { Col, Divider, Row, Typography } from "antd";
import { AreaChart, SummaryChart } from "components/charts";
import { TodayStats } from "components/data";
import { Page, SEO } from "components/layout";
import { Table } from "components/tables/table";
import { PERIOD_LENGTH } from "const";
import { myContext } from "context";
import { useGetGlobalData } from "hooks";
import React, { useContext, useEffect, useState } from "react";
const { Title, Text } = Typography;

const Index = ({
  pageContext,
}: {
  pageContext: GatsbyTypes.SitePageContext;
}) => {
  const [state, setState] = useState({
    stats: [],
    trends: [],
    loseTableData: [],
    winTableData: [],
  });
  useEffect(() => {
    const { stats, trends, loseTableData, winTableData } = useGetGlobalData(
      pageContext.data
    );
    setState({
      stats,
      trends,
      loseTableData,
      winTableData,
    });
  }, []);
  const { width } = useContext(myContext);

  return (
    <Page>
      <SEO
        title="Covid-19 Global epidemic situation"
        description="Gloval covid-19 trends and statistics"
        pathname="/"
      />
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Title level={3} style={{ marginBottom: "0px" }}>
            Covid-19 Global pandemic situation
          </Title>
          <Divider className="divider" />
          <Title level={5} style={{ marginBottom: "10px" }}>
            Today's stats (updated 3-times per day)
          </Title>
        </Col>
        <Col span={24} style={{ marginBottom: "10px" }}>
          <TodayStats stats={state.stats} />
        </Col>
      </Row>
      <>
        <Col span={24} style={{ marginBottom: "20px" }}>
          <Title level={5} style={{ marginBottom: "20px" }}>
            Global data trends by countries
          </Title>
          <div style={{ height: "450px" }}>
            <SummaryChart
              periods={state.trends}
              multiplyer={width?.multiplyer ?? 1}
            />
          </div>
        </Col>
        <Col span={24} style={{ marginBottom: "20px" }}>
          <Title level={5} style={{ marginBottom: "20px" }}>
            Trend 'Under control %' by countries
          </Title>
          <div style={{ height: "450px" }}>
            <AreaChart
              periods={state.trends}
              multiplyer={width?.multiplyer ?? 1}
              yValue="underControl"
            />
          </div>
        </Col>
        <Col span={24} style={{ marginBottom: "20px" }}>
          <Title level={5} style={{ marginBottom: "20px" }}>
            Trend 'Pandemic free %' by countries
          </Title>
          <div style={{ height: "450px" }}>
            <AreaChart
              periods={state.trends}
              multiplyer={width?.multiplyer ?? 1}
              yValue="pandemicFree"
            />
          </div>
        </Col>
      </>
      <Col span={24} style={{ marginBottom: "20px" }}>
        <Title level={5} style={{ marginBottom: "10px" }}>
          New death cases by countries (last two periods)
        </Title>
      </Col>
      <Row gutter={0}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Text>Winning / Won trends</Text>
          <Table
            data={state.winTableData}
            periodLength={PERIOD_LENGTH}
            order={false}
            kind={"newDeaths"}
            variation={"tight"}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Text>Losing / Flattening trends</Text>
          <Table
            data={state.loseTableData}
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
