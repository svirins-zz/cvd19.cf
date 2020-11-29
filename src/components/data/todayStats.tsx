import { Card, Col, Row, Statistic } from "antd";
import { getColorByStatus } from "lib";
import React from "react";

import { GlobalStats } from "@types";

export const TodayStats = ({ stats }: { stats: GlobalStats }): JSX.Element => {
  const { confirmed, deaths, recovered, days, countries, trend } = stats;
  const trendColor = getColorByStatus(trend);
  return (
    <>
      <Row gutter={0}>
        <Col xs={12} sm={12} md={12} lg={8} xl={8} key="1">
          <Card>
            <Statistic
              title="Total cases"
              value={confirmed}
              precision={0}
              valueStyle={{ color: "red", backgroundColor: "#f9f9fd" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={12} lg={8} xl={8} key="2">
          <Card>
            <Statistic
              title="Total deaths cases"
              value={deaths}
              precision={0}
              valueStyle={{ color: "red", backgroundColor: "#f9f9fd" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={12} lg={8} xl={8} key="3">
          <Card>
            <Statistic
              title="Total recovered cases"
              value={recovered}
              precision={0}
              valueStyle={{ color: "#3f8600", backgroundColor: "#f9f9fd" }}
            />
          </Card>
        </Col>

        <Col xs={12} sm={12} md={12} lg={8} xl={8} key="4">
          <Card>
            <Statistic
              title="Days since first case"
              value={days}
              precision={0}
              valueStyle={{ color: "#120338", backgroundColor: "#f9f9fd" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={12} lg={8} xl={8} key="5">
          <Card>
            <Statistic
              title="Countries affected"
              value={countries}
              precision={0}
              valueStyle={{ color: "#120338", backgroundColor: "#f9f9fd" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={12} lg={8} xl={8} key="6">
          <Card>
            <Statistic
              title="Data trend (last 5 days)"
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
