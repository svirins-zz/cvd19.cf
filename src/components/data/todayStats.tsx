import { Card, Col, Row, Statistic } from "antd";
import { getColorByStatus } from "lib";
import React from "react";

import { GlobalStats } from "@types";

export const TodayStats = ({ stats }: { stats: GlobalStats }) => {
  const { confirmed, deaths, recovered, days, countries, trend } = stats;
  const trendColor = getColorByStatus(trend!);
  return (
    <>
      <Row gutter={0}>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} key="1">
          <Card>
            <Statistic
              title="Total Cases"
              value={confirmed}
              precision={0}
              valueStyle={{ color: "red", backgroundColor: "#f9f9fd" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} key="2">
          <Card>
            <Statistic
              title="Total Deaths"
              value={deaths}
              precision={0}
              valueStyle={{ color: "red", backgroundColor: "#f9f9fd" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} key="3">
          <Card>
            <Statistic
              title="Total Recovered"
              value={recovered}
              precision={0}
              valueStyle={{ color: "#3f8600", backgroundColor: "#f9f9fd" }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={0}>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} key="4">
          <Card>
            <Statistic
              title="Days passed"
              value={days}
              precision={0}
              valueStyle={{ color: "#120338", backgroundColor: "#f9f9fd" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} key="5">
          <Card>
            <Statistic
              title="Countries (incl. vessels)"
              value={countries}
              precision={0}
              valueStyle={{ color: "#120338", backgroundColor: "#f9f9fd" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} key="6">
          <Card>
            <Statistic
              title="Data Trend (last 5 days)"
              value={trend}
              precision={0}
              valueStyle={{ color: trendColor, backgroundColor: "#f9f9fd" }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};
