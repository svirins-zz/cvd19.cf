import { Col, Divider, Row, Typography } from "antd";
import { AreaChart, SummaryChart } from "components/charts";
import { TodayStats } from "components/data";
import { Page, SEO } from "components/layout";
import { Table } from "components/table/table";
import { Spinner } from 'components/ui';
import { PERIOD_LENGTH } from "const";
import { myContext } from "context";
import { useGetGlobalData } from "hooks";
import React, { useContext, useEffect } from "react";
import { useImmer } from 'use-immer';

import { Country, IndexPageState, OutbreakStatus, TableType } from "@types";

const { Title, Paragraph } = Typography;

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
  const countries  = pageContext.data?.countries as Country[];
  useEffect(() => {
    const { stats, trends, loseTableData, winTableData } = useGetGlobalData(countries);
    setState((draft) => {
      draft.stats = stats,
      draft.trends = trends,
      draft.loseTableData = loseTableData,
      draft.winTableData = winTableData
    });
  }, []);
  const { width } = useContext(myContext);
  if (state.stats.confirmed === 0) {return <Spinner/>}
  return (
    <Page>
      <SEO
        title="Covid-19 Global epidemic situation"
        description="Gloval covid-19 trends and statistics"
        pathname="/"
      />
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Title level={4} style={{ marginBottom: "0px" }}>
            Covid-19 Global pandemic situation. Today&apos;s stats
          </Title>
          <Divider className="divider" />
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
            Trend &apos;Under control percent&apos; by countries
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
            Trend &apos;Pandemic free percent&apos; by countries
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
          New death cases by countries (last two periods). Winning / won and losing / flattening trends.
        </Paragraph>
      </Col>
      <Row gutter={0}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Table
            data={state.winTableData}
            periodLength={PERIOD_LENGTH}
            order={false}
            kind={TableType.NewDeaths}
            variation={"tight"}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
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
