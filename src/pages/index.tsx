import { Col, Divider, Row, Typography } from "antd";
import { AreaChart, SummaryChart } from "components/charts";
import { TodayStats } from "components/data";
import { Page, SEO } from "components/layout";
import { Table } from "components/tables/table";
import { PERIOD_LENGTH } from "const";
import { myContext } from "context";
import { useGetGlobalData } from "hooks";
import React, { useContext, useEffect } from "react";
import { useImmer } from 'use-immer';

import { IndexPageState, OutbreakStatus, TableType } from "@types";

const { Title, Text, Paragraph } = Typography;

const Index = ({
  pageContext,
}: {
  pageContext: GatsbyTypes.SitePageContext;
}): JSX.Element => {
  const [state, setState] = useImmer<IndexPageState>({
    stats: {
      confirmed: 0,
      deaths: 0,
      recovered: 0,
      countries: 0,
      days: 0,
      trend: OutbreakStatus.None,
    },
    trends: [],
    loseTableData: [],
    winTableData: [],
  });
  useEffect(() => {
    const { stats, trends, loseTableData, winTableData } = useGetGlobalData(
      pageContext.data
    );
    setState((draft) => {
      draft.stats = stats,
      draft.trends = trends,
      draft.loseTableData = loseTableData,
      draft.winTableData = winTableData
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
          <Paragraph className="bold-blue" style={{ marginBottom: "10px" }}>
            Today&apos;s stats (updated 3-times per day)
          </Paragraph>
        </Col>
        <Col span={24} style={{ marginBottom: "10px" }}>
          <TodayStats stats={state.stats} />
        </Col>
      </Row>
      <>
        <Col span={24} style={{ marginBottom: "20px" }}>
          <Paragraph className="bold-blue" style={{ marginBottom: "20px" }}>
            Global data trends by countries
          </Paragraph>
          <div style={{ height: "450px" }}>
            <SummaryChart
              periods={state.trends}
              multiplyer={width?.multiplyer ?? 1}
            />
          </div>
        </Col>
        <Col span={24} style={{ marginBottom: "20px" }}>
          <Paragraph className="bold-blue" style={{ marginBottom: "20px" }}>
            Trend &apos;Under control %&apos; by countries
          </Paragraph>
          <div style={{ height: "450px" }}>
            <AreaChart
              periods={state.trends}
              multiplyer={width?.multiplyer ?? 1}
              yValue="underControl"
            />
          </div>
        </Col>
        <Col span={24} style={{ marginBottom: "20px" }}>
          <Paragraph className="bold-blue" style={{ marginBottom: "20px" }}>
            Trend &apos;Pandemic free %&apos; by countries
          </Paragraph>
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
        <Paragraph className="bold-blue" style={{ marginBottom: "10px" }}>
          New death cases by countries (last two periods)
        </Paragraph>
      </Col>
      <Row gutter={0}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Text>Winning / Won trends</Text>
          <Table
            data={state.winTableData}
            periodLength={PERIOD_LENGTH}
            order={false}
            kind={TableType.NewDeaths}
            variation={"tight"}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Text>Losing / Flattening trends</Text>
          <Table
            data={state.loseTableData}
            periodLength={PERIOD_LENGTH}
            order={true}
            kind={TableType.NewDeaths}
            variation={"tight"}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default Index;
